# breakpoint_if_debugging
* debugging[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  void breakpoint_if_debugging() noexcept; // (1) C++26
}
```

## 概要
デバッガ実行時のみブレークポイントを設置する。

この関数は条件付きブレークポイントであり、デバッガがプログラムを監視中であればプログラムを一時停止 (ブレーク) するが、そうでなければ何もしないよう動作する。


## 効果
以下と等価：

```cpp
if (is_debugger_present()) {
  breakpoint();
}
```
* is_debugger_present()[link is_debugger_present.md]
* breakpoint()[link breakpoint.md]


## 例外
投げない


## 備考
- 実装としては、生成されるコードがプラットフォームに対して可能な限り最小になるように最適化することが期待される。例として、x86ターゲット環境ではINT3命令をひとつだけ生成することが期待される
- デバッガが提供する条件付きブレークポイント機能と比べて、以下の利点がある：
    - 停止条件がプログラムの一部として評価されるため高速である。デバッガの条件付きブレークポイントは、その位置に到達するたびにプログラムを停止させてデバッガ側で条件式を評価するため、繰り返し回数の多いループでは実行速度が大きく低下する
    - 停止位置がソースコードとともに管理される。行番号で指定するブレークポイントはコードの編集によってずれるが、この関数の呼び出しはコードの移動に追従し、リポジトリで共有できる。テンプレートやインライン関数、ラムダ式のように、デバッガから位置を指定しにくい箇所も指定できる
    - デバッガごとの設定が不要である。デバッガごとに異なるスクリプトを用意せずに、同一のソースコードで同じ位置に停止できる
    - デバッガをアタッチする前に実行される箇所でも停止できる。プロセス起動直後の処理や、子プロセスとして起動される処理など


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
  if (std::isnan(ret) || std::isinf(ret)) {
    // 演算結果でNaNかinfが発生したらブレークし、
    // デバッガでパラメータ (ローカル変数) などを確認する
    std::breakpoint_if_debugging();
  }
  return ret;
}

int main() {
  double ret = f(2.0, 0.0);
  std::println("{}", ret);
}
```
* std::breakpoint_if_debugging[color ff0000]
* std::isnan[link /reference/cmath/isnan.md]
* std::isinf[link /reference/cmath/isinf.md]

### 出力例
```
inf
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 24 [mark verified]
- [GCC](/implementation.md#gcc): 16.1 (`-lstdc++exp`オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P2546R5 Debugging Support](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2546r5.html)
