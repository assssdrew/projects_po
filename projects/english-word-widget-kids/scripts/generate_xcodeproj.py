#!/usr/bin/env python3
"""Generate EnglishWordKids.xcodeproj/project.pbxproj without Xcode."""

from __future__ import annotations

import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJ = ROOT / "app" / "EnglishWordKids" / "EnglishWordKids.xcodeproj"
PBX = PROJ / "project.pbxproj"


def uid() -> str:
    return uuid.uuid4().hex[:24].upper()


# Stable-ish IDs for readability in diffs (still unique).
IDS = {
    "project": uid(),
    "root": uid(),
    "app_target": uid(),
    "widget_target": uid(),
    "app_product": uid(),
    "widget_product": uid(),
    "sources_app": uid(),
    "sources_widget": uid(),
    "resources_app": uid(),
    "resources_widget": uid(),
    "frameworks_app": uid(),
    "frameworks_widget": uid(),
    "copy_embed": uid(),
    "app_group": uid(),
    "widget_group": uid(),
    "shared_group": uid(),
    "resources_group": uid(),
    "products_group": uid(),
    "main_group": uid(),
    "app_config_debug": uid(),
    "app_config_release": uid(),
    "widget_config_debug": uid(),
    "widget_config_release": uid(),
    "project_config_debug": uid(),
    "project_config_release": uid(),
    "config_list_project": uid(),
    "config_list_app": uid(),
    "config_list_widget": uid(),
    "widgetkit_fw": uid(),
    "swiftui_fw": uid(),
    "foundation_fw": uid(),
    "avf_fw": uid(),
    "embed_build": uid(),
    "container": uid(),
}

FILES = {
    # Shared
    "WordModels.swift": ("Shared/WordModels.swift", "source"),
    "WordStore.swift": ("Shared/WordStore.swift", "source"),
    "WordSchedule.swift": ("Shared/WordSchedule.swift", "source"),
    "WordVisualView.swift": ("Shared/WordVisualView.swift", "source"),
    # App
    "EnglishWordKidsApp.swift": ("App/EnglishWordKidsApp.swift", "source"),
    "RootView.swift": ("App/RootView.swift", "source"),
    "TodayView.swift": ("App/TodayView.swift", "source"),
    "FlashcardView.swift": ("App/FlashcardView.swift", "source"),
    "BrowseView.swift": ("App/BrowseView.swift", "source"),
    "SpeechHelper.swift": ("App/SpeechHelper.swift", "source"),
    "Assets.xcassets": ("App/Assets.xcassets", "resource"),
    # Widget
    "EnglishWordKidsWidgetBundle.swift": ("WidgetExtension/EnglishWordKidsWidgetBundle.swift", "source"),
    "EnglishWordKidsWidget.swift": ("WidgetExtension/EnglishWordKidsWidget.swift", "source"),
    "Info.plist": ("WidgetExtension/Info.plist", "plist"),
    # Resources
    "words.json": ("Resources/words.json", "resource"),
}

for name in FILES:
    IDS[f"file_{name}"] = uid()
    IDS[f"build_{name}"] = uid()


def file_ref(name: str) -> str:
    path, kind = FILES[name]
    last = Path(path).name
    if kind == "resource" and name.endswith(".xcassets"):
        return (
            f"\t\t{IDS[f'file_{name}']} /* {last} */ = {{isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = {last}; sourceTree = \"<group>\"; }};"
        )
    if kind == "resource":
        return (
            f"\t\t{IDS[f'file_{name}']} /* {last} */ = {{isa = PBXFileReference; lastKnownFileType = text.json; path = {last}; sourceTree = \"<group>\"; }};"
        )
    if kind == "plist":
        return (
            f"\t\t{IDS[f'file_{name}']} /* {last} */ = {{isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = {last}; sourceTree = \"<group>\"; }};"
        )
    return (
        f"\t\t{IDS[f'file_{name}']} /* {last} */ = {{isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = {last}; sourceTree = \"<group>\"; }};"
    )


def build_file(name: str) -> str:
    last = Path(FILES[name][0]).name
    return (
        f"\t\t{IDS[f'build_{name}']} /* {last} in Sources */ = {{isa = PBXBuildFile; fileRef = {IDS[f'file_{name}']} /* {last} */; }};"
        if FILES[name][1] == "source"
        else f"\t\t{IDS[f'build_{name}']} /* {last} in Resources */ = {{isa = PBXBuildFile; fileRef = {IDS[f'file_{name}']} /* {last} */; }};"
    )


SHARED_SOURCES = [
    "WordModels.swift",
    "WordStore.swift",
    "WordSchedule.swift",
    "WordVisualView.swift",
]
APP_SOURCES = SHARED_SOURCES + [
    "EnglishWordKidsApp.swift",
    "RootView.swift",
    "TodayView.swift",
    "FlashcardView.swift",
    "BrowseView.swift",
    "SpeechHelper.swift",
]
WIDGET_SOURCES = SHARED_SOURCES + [
    "EnglishWordKidsWidgetBundle.swift",
    "EnglishWordKidsWidget.swift",
]
APP_RESOURCES = ["Assets.xcassets", "words.json"]
WIDGET_RESOURCES = ["words.json"]


def main() -> None:
    PROJ.mkdir(parents=True, exist_ok=True)

    lines: list[str] = []
    a = lines.append
    a("// !$*UTF8*$!")
    a("{")
    a("\tarchiveVersion = 1;")
    a("\tclasses = {")
    a("\t};")
    a("\tobjectVersion = 56;")
    a("\tobjects = {")
    a("")

    # Build files
    a("/* Begin PBXBuildFile section */")
    for name in FILES:
        if FILES[name][1] in {"source", "resource"}:
            a(build_file(name))
    a(
        f"\t\t{IDS['embed_build']} /* EnglishWordKidsWidget.appex in Embed Foundation Extensions */ = {{isa = PBXBuildFile; fileRef = {IDS['widget_product']} /* EnglishWordKidsWidget.appex */; settings = {{ATTRIBUTES = (RemoveHeadersOnCopy, ); }}; }};"
    )
    a(
        f"\t\t{IDS['widgetkit_fw']} /* WidgetKit.framework in Frameworks */ = {{isa = PBXBuildFile; fileRef = {IDS['foundation_fw']} /* WidgetKit.framework */; }};"
    )
    # fix - need separate file refs for frameworks
    a("/* End PBXBuildFile section */")
    a("")

    # Actually regenerate framework refs cleanly — rewrite whole file more carefully below
    content = generate()
    PBX.write_text(content, encoding="utf-8")
    print(f"Wrote {PBX}")


def generate() -> str:
    # Fresh IDs map including frameworks
    ids = IDS
    ids["fw_widgetkit_ref"] = uid()
    ids["fw_swiftui_ref"] = uid()
    ids["fw_widgetkit_build"] = uid()
    ids["fw_swiftui_build"] = uid()

    def bref(name: str) -> str:
        return ids[f"file_{name}"]

    def bld(name: str) -> str:
        return ids[f"build_{name}"]

    parts: list[str] = []
    p = parts.append

    p("// !$*UTF8*$!")
    p("{")
    p("\tarchiveVersion = 1;")
    p("\tclasses = {")
    p("\t};")
    p("\tobjectVersion = 56;")
    p("\tobjects = {")
    p("")

    # PBXBuildFile
    p("/* Begin PBXBuildFile section */")
    for name, (_, kind) in FILES.items():
        last = Path(FILES[name][0]).name
        if kind == "source":
            # app + widget both need shared sources — create two build files for shared
            pass
    # Dedicated build IDs for app/widget membership
    for name in APP_SOURCES:
        last = Path(FILES[name][0]).name
        p(f"\t\t{bld(name)} /* {last} in Sources */ = {{isa = PBXBuildFile; fileRef = {bref(name)} /* {last} */; }};")
    for name in APP_RESOURCES:
        last = Path(FILES[name][0]).name
        p(f"\t\t{bld(name)} /* {last} in Resources */ = {{isa = PBXBuildFile; fileRef = {bref(name)} /* {last} */; }};")

    # Widget needs its own build-file IDs for shared sources
    for name in WIDGET_SOURCES:
        key = f"wbuild_{name}"
        ids[key] = uid()
        last = Path(FILES[name][0]).name
        p(f"\t\t{ids[key]} /* {last} in Sources */ = {{isa = PBXBuildFile; fileRef = {bref(name)} /* {last} */; }};")
    for name in WIDGET_RESOURCES:
        key = f"wbuild_res_{name}"
        ids[key] = uid()
        last = Path(FILES[name][0]).name
        p(f"\t\t{ids[key]} /* {last} in Resources */ = {{isa = PBXBuildFile; fileRef = {bref(name)} /* {last} */; }};")

    p(f"\t\t{ids['embed_build']} /* EnglishWordKidsWidget.appex in Embed Foundation Extensions */ = {{isa = PBXBuildFile; fileRef = {ids['widget_product']} /* EnglishWordKidsWidget.appex */; settings = {{ATTRIBUTES = (RemoveHeadersOnCopy, ); }}; }};")
    p(f"\t\t{ids['fw_widgetkit_build']} /* WidgetKit.framework in Frameworks */ = {{isa = PBXBuildFile; fileRef = {ids['fw_widgetkit_ref']} /* WidgetKit.framework */; }};")
    p(f"\t\t{ids['fw_swiftui_build']} /* SwiftUI.framework in Frameworks */ = {{isa = PBXBuildFile; fileRef = {ids['fw_swiftui_ref']} /* SwiftUI.framework */; }};")
    p("/* End PBXBuildFile section */")
    p("")

    # Container attach
    p("/* Begin PBXContainerItemProxy section */")
    p(f"\t\t{ids['container']} /* PBXContainerItemProxy */ = {{")
    p("\t\t\tisa = PBXContainerItemProxy;")
    p(f"\t\t\tcontainerPortal = {ids['project']} /* Project object */;")
    p("\t\t\tproxyType = 1;")
    p(f"\t\t\tremoteGlobalIDString = {ids['widget_target']};")
    p('\t\t\tremoteInfo = EnglishWordKidsWidget;')
    p("\t\t};")
    p("/* End PBXContainerItemProxy section */")
    p("")

    # Copy files
    p("/* Begin PBXCopyFilesBuildPhase section */")
    p(f"\t\t{ids['copy_embed']} /* Embed Foundation Extensions */ = {{")
    p("\t\t\tisa = PBXCopyFilesBuildPhase;")
    p("\t\t\tbuildActionMask = 2147483647;")
    p("\t\t\tdstPath = \"\";")
    p("\t\t\tdstSubfolderSpec = 13;")
    p("\t\t\tfiles = (")
    p(f"\t\t\t\t{ids['embed_build']} /* EnglishWordKidsWidget.appex in Embed Foundation Extensions */,")
    p("\t\t\t);")
    p("\t\t\tname = \"Embed Foundation Extensions\";")
    p("\t\t\trunOnlyForDeploymentPostprocessing = 0;")
    p("\t\t};")
    p("/* End PBXCopyFilesBuildPhase section */")
    p("")

    # File refs
    p("/* Begin PBXFileReference section */")
    p(f"\t\t{ids['app_product']} /* EnglishWordKids.app */ = {{isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = EnglishWordKids.app; sourceTree = BUILT_PRODUCTS_DIR; }};")
    p(f"\t\t{ids['widget_product']} /* EnglishWordKidsWidget.appex */ = {{isa = PBXFileReference; explicitFileType = \"wrapper.app-extension\"; includeInIndex = 0; path = EnglishWordKidsWidget.appex; sourceTree = BUILT_PRODUCTS_DIR; }};")
    p(f"\t\t{ids['fw_widgetkit_ref']} /* WidgetKit.framework */ = {{isa = PBXFileReference; lastKnownFileType = wrapper.framework; name = WidgetKit.framework; path = System/Library/Frameworks/WidgetKit.framework; sourceTree = SDKROOT; }};")
    p(f"\t\t{ids['fw_swiftui_ref']} /* SwiftUI.framework */ = {{isa = PBXFileReference; lastKnownFileType = wrapper.framework; name = SwiftUI.framework; path = System/Library/Frameworks/SwiftUI.framework; sourceTree = SDKROOT; }};")
    for name, (path, kind) in FILES.items():
        last = Path(path).name
        if kind == "source":
            p(f"\t\t{bref(name)} /* {last} */ = {{isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = {last}; sourceTree = \"<group>\"; }};")
        elif name.endswith(".xcassets"):
            p(f"\t\t{bref(name)} /* {last} */ = {{isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = {last}; sourceTree = \"<group>\"; }};")
        elif kind == "plist":
            p(f"\t\t{bref(name)} /* {last} */ = {{isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = {last}; sourceTree = \"<group>\"; }};")
        else:
            p(f"\t\t{bref(name)} /* {last} */ = {{isa = PBXFileReference; lastKnownFileType = text.json; path = {last}; sourceTree = \"<group>\"; }};")
    p("/* End PBXFileReference section */")
    p("")

    # Frameworks build phases
    p("/* Begin PBXFrameworksBuildPhase section */")
    p(f"\t\t{ids['frameworks_app']} /* Frameworks */ = {{")
    p("\t\t\tisa = PBXFrameworksBuildPhase;")
    p("\t\t\tbuildActionMask = 2147483647;")
    p("\t\t\tfiles = (")
    p("\t\t\t);")
    p("\t\t\trunOnlyForDeploymentPostprocessing = 0;")
    p("\t\t};")
    p(f"\t\t{ids['frameworks_widget']} /* Frameworks */ = {{")
    p("\t\t\tisa = PBXFrameworksBuildPhase;")
    p("\t\t\tbuildActionMask = 2147483647;")
    p("\t\t\tfiles = (")
    p(f"\t\t\t\t{ids['fw_widgetkit_build']} /* WidgetKit.framework in Frameworks */,")
    p(f"\t\t\t\t{ids['fw_swiftui_build']} /* SwiftUI.framework in Frameworks */,")
    p("\t\t\t);")
    p("\t\t\trunOnlyForDeploymentPostprocessing = 0;")
    p("\t\t};")
    p("/* End PBXFrameworksBuildPhase section */")
    p("")

    # Groups
    p("/* Begin PBXGroup section */")
    p(f"\t\t{ids['main_group']} = {{")
    p("\t\t\tisa = PBXGroup;")
    p("\t\t\tchildren = (")
    p(f"\t\t\t\t{ids['shared_group']} /* Shared */,")
    p(f"\t\t\t\t{ids['app_group']} /* App */,")
    p(f"\t\t\t\t{ids['widget_group']} /* WidgetExtension */,")
    p(f"\t\t\t\t{ids['resources_group']} /* Resources */,")
    p(f"\t\t\t\t{ids['products_group']} /* Products */,")
    p(f"\t\t\t\t{ids['fw_widgetkit_ref']} /* WidgetKit.framework */,")
    p(f"\t\t\t\t{ids['fw_swiftui_ref']} /* SwiftUI.framework */,")
    p("\t\t\t);")
    p("\t\t\tsourceTree = \"<group>\";")
    p("\t\t};")

    p(f"\t\t{ids['products_group']} /* Products */ = {{")
    p("\t\t\tisa = PBXGroup;")
    p("\t\t\tchildren = (")
    p(f"\t\t\t\t{ids['app_product']} /* EnglishWordKids.app */,")
    p(f"\t\t\t\t{ids['widget_product']} /* EnglishWordKidsWidget.appex */,")
    p("\t\t\t);")
    p("\t\t\tname = Products;")
    p("\t\t\tsourceTree = \"<group>\";")
    p("\t\t};")

    def group(gid: str, name: str, files: list[str]) -> None:
        p(f"\t\t{gid} /* {name} */ = {{")
        p("\t\t\tisa = PBXGroup;")
        p("\t\t\tchildren = (")
        for f in files:
            last = Path(FILES[f][0]).name
            p(f"\t\t\t\t{bref(f)} /* {last} */,")
        p("\t\t\t);")
        p(f"\t\t\tpath = {name};")
        p("\t\t\tsourceTree = \"<group>\";")
        p("\t\t};")

    group(ids["shared_group"], "Shared", SHARED_SOURCES)
    group(
        ids["app_group"],
        "App",
        [
            "EnglishWordKidsApp.swift",
            "RootView.swift",
            "TodayView.swift",
            "FlashcardView.swift",
            "BrowseView.swift",
            "SpeechHelper.swift",
            "Assets.xcassets",
        ],
    )
    group(
        ids["widget_group"],
        "WidgetExtension",
        [
            "EnglishWordKidsWidgetBundle.swift",
            "EnglishWordKidsWidget.swift",
            "Info.plist",
        ],
    )
    group(ids["resources_group"], "Resources", ["words.json"])
    p("/* End PBXGroup section */")
    p("")

    # Native targets
    p("/* Begin PBXNativeTarget section */")
    p(f"\t\t{ids['app_target']} /* EnglishWordKids */ = {{")
    p("\t\t\tisa = PBXNativeTarget;")
    p("\t\t\tbuildConfigurationList = " + ids["config_list_app"] + " /* Build configuration list for PBXNativeTarget \"EnglishWordKids\" */;")
    p("\t\t\tbuildPhases = (")
    p(f"\t\t\t\t{ids['sources_app']} /* Sources */,")
    p(f"\t\t\t\t{ids['frameworks_app']} /* Frameworks */,")
    p(f"\t\t\t\t{ids['resources_app']} /* Resources */,")
    p(f"\t\t\t\t{ids['copy_embed']} /* Embed Foundation Extensions */,")
    p("\t\t\t);")
    p("\t\t\tbuildRules = (")
    p("\t\t\t);")
    p("\t\t\tdependencies = (")
    p(f"\t\t\t\t{ids['root']} /* PBXTargetDependency */,")
    p("\t\t\t);")
    p('\t\t\tname = EnglishWordKids;')
    p('\t\t\tproductName = EnglishWordKids;')
    p(f"\t\t\tproductReference = {ids['app_product']} /* EnglishWordKids.app */;")
    p('\t\t\tproductType = "com.apple.product-type.application";')
    p("\t\t};")

    p(f"\t\t{ids['widget_target']} /* EnglishWordKidsWidget */ = {{")
    p("\t\t\tisa = PBXNativeTarget;")
    p("\t\t\tbuildConfigurationList = " + ids["config_list_widget"] + " /* Build configuration list for PBXNativeTarget \"EnglishWordKidsWidget\" */;")
    p("\t\t\tbuildPhases = (")
    p(f"\t\t\t\t{ids['sources_widget']} /* Sources */,")
    p(f"\t\t\t\t{ids['frameworks_widget']} /* Frameworks */,")
    p(f"\t\t\t\t{ids['resources_widget']} /* Resources */,")
    p("\t\t\t);")
    p("\t\t\tbuildRules = (")
    p("\t\t\t);")
    p("\t\t\tdependencies = (")
    p("\t\t\t);")
    p('\t\t\tname = EnglishWordKidsWidget;')
    p('\t\t\tproductName = EnglishWordKidsWidget;')
    p(f"\t\t\tproductReference = {ids['widget_product']} /* EnglishWordKidsWidget.appex */;")
    p('\t\t\tproductType = "com.apple.product-type.app-extension";')
    p("\t\t};")
    p("/* End PBXNativeTarget section */")
    p("")

    # Project
    p("/* Begin PBXProject section */")
    p(f"\t\t{ids['project']} /* Project object */ = {{")
    p("\t\t\tisa = PBXProject;")
    p("\t\t\tattributes = {")
    p("\t\t\t\tBuildIndependentTargetsInParallel = 1;")
    p('\t\t\t\tLastSwiftUpdateCheck = 1500;')
    p("\t\t\t\tLastUpgradeCheck = 1500;")
    p("\t\t\t\tTargetAttributes = {")
    p(f"\t\t\t\t\t{ids['app_target']} = {{")
    p("\t\t\t\t\t\tCreatedOnToolsVersion = 15.0;")
    p("\t\t\t\t\t};")
    p(f"\t\t\t\t\t{ids['widget_target']} = {{")
    p("\t\t\t\t\t\tCreatedOnToolsVersion = 15.0;")
    p("\t\t\t\t\t};")
    p("\t\t\t\t};")
    p("\t\t\t};")
    p(f"\t\t\tbuildConfigurationList = {ids['config_list_project']} /* Build configuration list for PBXProject \"EnglishWordKids\" */;")
    p('\t\t\tcompatibilityVersion = "Xcode 14.0";')
    p('\t\t\tdevelopmentRegion = en;')
    p("\t\t\thasScannedForEncodings = 0;")
    p("\t\t\tknownRegions = (")
    p("\t\t\t\ten,")
    p("\t\t\t\tBase,")
    p("\t\t\t\tru,")
    p("\t\t\t);")
    p(f"\t\t\tmainGroup = {ids['main_group']};")
    p(f"\t\t\tproductRefGroup = {ids['products_group']} /* Products */;")
    p('\t\t\tprojectDirPath = "";')
    p('\t\t\tprojectRoot = "";')
    p("\t\t\ttargets = (")
    p(f"\t\t\t\t{ids['app_target']} /* EnglishWordKids */,")
    p(f"\t\t\t\t{ids['widget_target']} /* EnglishWordKidsWidget */,")
    p("\t\t\t);")
    p("\t\t};")
    p("/* End PBXProject section */")
    p("")

    # Resources
    p("/* Begin PBXResourcesBuildPhase section */")
    p(f"\t\t{ids['resources_app']} /* Resources */ = {{")
    p("\t\t\tisa = PBXResourcesBuildPhase;")
    p("\t\t\tbuildActionMask = 2147483647;")
    p("\t\t\tfiles = (")
    for name in APP_RESOURCES:
        last = Path(FILES[name][0]).name
        p(f"\t\t\t\t{bld(name)} /* {last} in Resources */,")
    p("\t\t\t);")
    p("\t\t\trunOnlyForDeploymentPostprocessing = 0;")
    p("\t\t};")
    p(f"\t\t{ids['resources_widget']} /* Resources */ = {{")
    p("\t\t\tisa = PBXResourcesBuildPhase;")
    p("\t\t\tbuildActionMask = 2147483647;")
    p("\t\t\tfiles = (")
    for name in WIDGET_RESOURCES:
        p(f"\t\t\t\t{ids[f'wbuild_res_{name}']} /* {Path(FILES[name][0]).name} in Resources */,")
    p("\t\t\t);")
    p("\t\t\trunOnlyForDeploymentPostprocessing = 0;")
    p("\t\t};")
    p("/* End PBXResourcesBuildPhase section */")
    p("")

    # Sources
    p("/* Begin PBXSourcesBuildPhase section */")
    p(f"\t\t{ids['sources_app']} /* Sources */ = {{")
    p("\t\t\tisa = PBXSourcesBuildPhase;")
    p("\t\t\tbuildActionMask = 2147483647;")
    p("\t\t\tfiles = (")
    for name in APP_SOURCES:
        last = Path(FILES[name][0]).name
        p(f"\t\t\t\t{bld(name)} /* {last} in Sources */,")
    p("\t\t\t);")
    p("\t\t\trunOnlyForDeploymentPostprocessing = 0;")
    p("\t\t};")
    p(f"\t\t{ids['sources_widget']} /* Sources */ = {{")
    p("\t\t\tisa = PBXSourcesBuildPhase;")
    p("\t\t\tbuildActionMask = 2147483647;")
    p("\t\t\tfiles = (")
    for name in WIDGET_SOURCES:
        last = Path(FILES[name][0]).name
        p(f"\t\t\t\t{ids[f'wbuild_{name}']} /* {last} in Sources */,")
    p("\t\t\t);")
    p("\t\t\trunOnlyForDeploymentPostprocessing = 0;")
    p("\t\t};")
    p("/* End PBXSourcesBuildPhase section */")
    p("")

    # Target dependency
    p("/* Begin PBXTargetDependency section */")
    p(f"\t\t{ids['root']} /* PBXTargetDependency */ = {{")
    p("\t\t\tisa = PBXTargetDependency;")
    p(f"\t\t\ttarget = {ids['widget_target']} /* EnglishWordKidsWidget */;")
    p(f"\t\t\ttargetProxy = {ids['container']} /* PBXContainerItemProxy */;")
    p("\t\t};")
    p("/* End PBXTargetDependency section */")
    p("")

    # Build configurations
    def project_cfg(cid: str, name: str) -> None:
        p(f"\t\t{cid} /* {name} */ = {{")
        p("\t\t\tisa = XCBuildConfiguration;")
        p("\t\t\tbuildSettings = {")
        p("\t\t\t\tALWAYS_SEARCH_USER_PATHS = NO;")
        p("\t\t\t\tCLANG_ENABLE_MODULES = YES;")
        p("\t\t\t\tCOPY_PHASE_STRIP = NO;")
        p('\t\t\t\tDEBUG_INFORMATION_FORMAT = dwarf;')
        p("\t\t\t\tENABLE_STRICT_OBJC_MSGSEND = YES;")
        p("\t\t\t\tGCC_DYNAMIC_NO_PIC = NO;")
        p('\t\t\t\tIPHONEOS_DEPLOYMENT_TARGET = 17.0;')
        p("\t\t\t\tONLY_ACTIVE_ARCH = YES;" if name == "Debug" else "\t\t\t\tONLY_ACTIVE_ARCH = NO;")
        p('\t\t\t\tSDKROOT = iphoneos;')
        p('\t\t\t\tSWIFT_VERSION = 5.0;')
        if name == "Debug":
            p("\t\t\t\tSWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;")
            p("\t\t\t\tSWIFT_OPTIMIZATION_LEVEL = \"-Onone\";")
            p("\t\t\t\tGCC_PREPROCESSOR_DEFINITIONS = (")
            p('\t\t\t\t\t"DEBUG=1",')
            p('\t\t\t\t\t"$(inherited)",')
            p("\t\t\t\t);")
        else:
            p("\t\t\t\tSWIFT_COMPILATION_MODE = wholemodule;")
            p("\t\t\t\tVALIDATE_PRODUCT = YES;")
        p("\t\t\t};")
        p(f'\t\t\tname = {name};')
        p("\t\t};")

    def app_cfg(cid: str, name: str) -> None:
        p(f"\t\t{cid} /* {name} */ = {{")
        p("\t\t\tisa = XCBuildConfiguration;")
        p("\t\t\tbuildSettings = {")
        p("\t\t\t\tASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;")
        p("\t\t\t\tASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;")
        p("\t\t\t\tCODE_SIGN_STYLE = Automatic;")
        p('\t\t\t\tCURRENT_PROJECT_VERSION = 1;')
        p("\t\t\t\tDEVELOPMENT_TEAM = \"\";")
        p("\t\t\t\tENABLE_PREVIEWS = YES;")
        p("\t\t\t\tGENERATE_INFOPLIST_FILE = YES;")
        p('\t\t\t\tINFOPLIST_KEY_CFBundleDisplayName = "English Words";')
        p('\t\t\t\tINFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;')
        p('\t\t\t\tINFOPLIST_KEY_UILaunchScreen_Generation = YES;')
        p('\t\t\t\tINFOPLIST_KEY_UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait;')
        p('\t\t\t\tLD_RUNPATH_SEARCH_PATHS = (')
        p('\t\t\t\t\t"$(inherited)",')
        p('\t\t\t\t\t"@executable_path/Frameworks",')
        p("\t\t\t\t);")
        p('\t\t\t\tMARKETING_VERSION = 0.1.0;')
        p('\t\t\t\tPRODUCT_BUNDLE_IDENTIFIER = com.projectsopo.EnglishWordKids;')
        p('\t\t\t\tPRODUCT_NAME = "$(TARGET_NAME)";')
        p('\t\t\t\tSUPPORTED_PLATFORMS = "iphoneos iphonesimulator";')
        p('\t\t\t\tSWIFT_EMIT_LOC_STRINGS = YES;')
        p('\t\t\t\tTARGETED_DEVICE_FAMILY = 1;')
        p("\t\t\t};")
        p(f'\t\t\tname = {name};')
        p("\t\t};")

    def widget_cfg(cid: str, name: str) -> None:
        p(f"\t\t{cid} /* {name} */ = {{")
        p("\t\t\tisa = XCBuildConfiguration;")
        p("\t\t\tbuildSettings = {")
        p("\t\t\t\tCODE_SIGN_STYLE = Automatic;")
        p('\t\t\t\tCURRENT_PROJECT_VERSION = 1;')
        p("\t\t\t\tDEVELOPMENT_TEAM = \"\";")
        p("\t\t\t\tGENERATE_INFOPLIST_FILE = YES;")
        p(f'\t\t\t\tINFOPLIST_FILE = WidgetExtension/Info.plist;')
        p('\t\t\t\tINFOPLIST_KEY_CFBundleDisplayName = "Слово";')
        p('\t\t\t\tINFOPLIST_KEY_NSHumanReadableCopyright = "";')
        p('\t\t\t\tLD_RUNPATH_SEARCH_PATHS = (')
        p('\t\t\t\t\t"$(inherited)",')
        p('\t\t\t\t\t"@executable_path/Frameworks",')
        p('\t\t\t\t\t"@executable_path/../../Frameworks",')
        p("\t\t\t\t);")
        p('\t\t\t\tMARKETING_VERSION = 0.1.0;')
        p('\t\t\t\tPRODUCT_BUNDLE_IDENTIFIER = com.projectsopo.EnglishWordKids.Widget;')
        p('\t\t\t\tPRODUCT_NAME = "$(TARGET_NAME)";')
        p('\t\t\t\tSKIP_INSTALL = YES;')
        p('\t\t\t\tSUPPORTED_PLATFORMS = "iphoneos iphonesimulator";')
        p('\t\t\t\tSWIFT_EMIT_LOC_STRINGS = YES;')
        p('\t\t\t\tTARGETED_DEVICE_FAMILY = 1;')
        p("\t\t\t};")
        p(f'\t\t\tname = {name};')
        p("\t\t};")

    p("/* Begin XCBuildConfiguration section */")
    project_cfg(ids["project_config_debug"], "Debug")
    project_cfg(ids["project_config_release"], "Release")
    app_cfg(ids["app_config_debug"], "Debug")
    app_cfg(ids["app_config_release"], "Release")
    widget_cfg(ids["widget_config_debug"], "Debug")
    widget_cfg(ids["widget_config_release"], "Release")
    p("/* End XCBuildConfiguration section */")
    p("")

    p("/* Begin XCConfigurationList section */")
    p(f"\t\t{ids['config_list_project']} /* Build configuration list for PBXProject \"EnglishWordKids\" */ = {{")
    p("\t\t\tisa = XCConfigurationList;")
    p("\t\t\tbuildConfigurations = (")
    p(f"\t\t\t\t{ids['project_config_debug']} /* Debug */,")
    p(f"\t\t\t\t{ids['project_config_release']} /* Release */,")
    p("\t\t\t);")
    p("\t\t\tdefaultConfigurationIsVisible = 0;")
    p('\t\t\tdefaultConfigurationName = Release;')
    p("\t\t};")
    p(f"\t\t{ids['config_list_app']} /* Build configuration list for PBXNativeTarget \"EnglishWordKids\" */ = {{")
    p("\t\t\tisa = XCConfigurationList;")
    p("\t\t\tbuildConfigurations = (")
    p(f"\t\t\t\t{ids['app_config_debug']} /* Debug */,")
    p(f"\t\t\t\t{ids['app_config_release']} /* Release */,")
    p("\t\t\t);")
    p("\t\t\tdefaultConfigurationIsVisible = 0;")
    p('\t\t\tdefaultConfigurationName = Release;')
    p("\t\t};")
    p(f"\t\t{ids['config_list_widget']} /* Build configuration list for PBXNativeTarget \"EnglishWordKidsWidget\" */ = {{")
    p("\t\t\tisa = XCConfigurationList;")
    p("\t\t\tbuildConfigurations = (")
    p(f"\t\t\t\t{ids['widget_config_debug']} /* Debug */,")
    p(f"\t\t\t\t{ids['widget_config_release']} /* Release */,")
    p("\t\t\t);")
    p("\t\t\tdefaultConfigurationIsVisible = 0;")
    p('\t\t\tdefaultConfigurationName = Release;')
    p("\t\t};")
    p("/* End XCConfigurationList section */")
    p("\t};")
    p(f"\trootObject = {ids['project']} /* Project object */;")
    p("}")
    p("")
    return "\n".join(parts)


if __name__ == "__main__":
    main()
