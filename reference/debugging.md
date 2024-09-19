# debugging
* debugging[meta header]
* cpp26[meta cpp]

`<debugging>`ヘッダでは、プログラムのデバッグ実行をサポートする機能を提供する。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`breakpoint`](debugging/breakpoint.md) | ブレークポイントを設置する (functional) | C++26 |
| [`breakpoint_if_debugging`](debugging/breakpoint_if_debugging.md) | デバッガ実行時のみブレークポイントを設置する (functional) | C++26 |
| [`is_debugger_present`](debugging/is_debugger_present.md) | デバッガ実行中か判定する (functional) | C++26 |


## この機能が必要になった背景・経緯
開発プラットフォームによってデバッガやブレークポイントの機能は提供されているが、本ライブラリのようにプログラム中に明示的にブレークポイントを設置し、プログラムとデバッガを対話させることでデバッグ体験が向上することがある。

実装経験としては以下のようなものがあり、これらをこのライブラリで標準化した：

| 開発環境 | 機能 |
|----------|------|
| Microsoft C/C++ Optimizing Compiler | `__debugbreak()`関数 (無条件ブレークポイント) |
| Win32 API                   | `IsDebuggerPresent()`関数 (デバッガ実行中か判定) |
| LLVM Clang                  | `__builtin_debugtrap()`組み込み関数 (無条件ブレークポイント) |
| arm Keil, ARM Compiler      | `__breakpoint()`関数 (無条件ブレークポイント) |
| Portable Snippetsライブラリ | `psnip_trap()`関数 (無条件ブレークポイント) |
| Debug Breakライブラリ       | `debug_break()`関数 (無条件ブレークポイント) |
| Boost.Testライブラリ        | `debugger_break()`関数 (無条件ブレークポイント)<br/> `under_debugger()`関数 (デバッガ実行中か判定) |
| EASTLライブラリ             | `EASTL_DEBUG_BREAK()`マクロ (無条件ブレークポイント) |
| Catch2ライブラリ            | `CATCH_TRAP`マクロ (無条件ブレークポイント)<br/> `CATCH_BREAK_INTO_DEBUGGER`マクロ (条件付きブレークポイント)<br/> `isDebuggerActive()`関数 (デバッガ実行中か判定) |
| JUCEライブラリ              | `JUCE_BREAK_IN_DEBUGGER`マクロ (無条件ブレークポイント)<br/> `juce_isRunningUnderDebugger()`関数、`Process::isRunningUnderDebugger()`関数 (デバッガ実行中か判定) |
| ImGuiライブラリ             | `IM_DEBUG_BREAK()`マクロ (無条件ブレークポイント) |
| AWS C SDK                   | `aws_debug_break()`関数 (条件付きブレークポイント)<br/> `aws_is_debugger_present()`関数 (デバッガ実行中か判定) |
| UnrealEngine                | `UE_DEBUG_BREAK`マクロ (条件付きブレークポイント)<br/> `IsDebuggerPresent()`関数 (デバッガ実行中か判定) |


## バージョン
### 言語
- C++26


## 参照
- [P2546R5 Debugging Support](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2546r5.html)
