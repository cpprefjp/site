# is_debugger_present
* debugging[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  bool is_debugger_present() noexcept; // (1) C++26
}
```

## 概要
デバッガ実行中か判定する。

この関数は、デバッガがプログラムを監視中かどうかを判定する。プラットフォーム固有の結果を決定できない場合、ユーザーがこの関数を定義することで柔軟に動作を制御できる。


## 置き換え可能
ユーザーのプログラムでこの関数を定義することで、標準ライブラリで定義されるデフォルトの動作を置き換えることができる。

## 要求される振る舞い
- この関数は事前条件をもたないこと


## デフォルトの振る舞い
- 実装定義


## 効果
デバッガがプログラムを監視中である場合、実装は`true`を返す。


## 例外
投げない


## 備考
- 実装は、プログラムがデバッガによって監視されているかどうかを判定するために、必要に応じて即時クエリを実行する
- Windowsまたは同等のシステムでは、この関数の動作はWin32関数の`::IsDebuggerPresent()`を呼び出すことで実現できる
- POSIX環境では、監視親プロセスをチェックすることで実現できる。その際、監視親プロセスがデバッガであるかどうかは最善の努力で判定する
- この関数は、結果のキャッシュを規定しない。既存の実装もデバッガの存在クエリについての結果をキャッシュするようなことはしておらず、そのコストが問題にはなっていなかった。また、結果をキャッシュする場合、[`std::breakpoint_if_debugging()`](breakpoint_if_debugging.md)のインタフェースにも影響してしまう


## 例
```cpp example
#include <print>
#include <debugging>
#include <cmath>

// なんらかの処理
double g(double a, double b) {
  return a / b;
}

double f(double a, double b) {
  double ret = g(a, b);
  if (std::isnan(ret)) {
    // 演算結果でNaNが発生したらブレークし、
    // デバッガでパラメータ (ローカル変数) などを確認する
    if (std::is_debugger_present()) {
      std::breakpoint();
    }
  }
}

int main() {
  double ret = f(2.0, 0.0);
  std::println("{}", ret);
}
```
* std::is_debugger_present[color ff0000]
* std::breakpoint[link breakpoint.md]
* std::isnan[link /reference/cmath/isnan.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 10


## 参照
- [P2546R5 Debugging Support](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2546r5.html)
- [P2810R4 `is_debugger_present` `is_replaceable`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2810r4.html)
