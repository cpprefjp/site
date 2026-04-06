# ckd_sub
* stdckdint.h[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class type1, class type2, class type3>
bool ckd_sub(type1* result, type2 a, type3 b);
```

## 概要
検査付きの整数の減算を行う。`a - b`を計算し、結果を`result`が指す先に格納する。オーバーフローが発生した場合は`true`を返す。

C言語の`<stdckdint.h>`で定義される関数であり、C++においてはC互換性のために提供される。C言語では型総称マクロ (type-generic macro) として定義されるが、C++では関数テンプレートとして提供される。

## テンプレートパラメータ制約
- `type1`、`type2`、`type3`はいずれも符号付き整数型または符号なし整数型であること

## 戻り値
`a - b`の数学的な結果が`type1`で表現可能な範囲を超える場合 (オーバーフロー) は`true`を返し、そうでなければ`false`を返す。

## 効果
`a - b`の数学的な結果を`type1`に変換した値を`*result`に格納する。

## 例
```cpp example
#include <stdckdint.h>
#include <cassert>
#include <climits>

int main() {
  int result = 0;

  // オーバーフローしない場合
  bool overflow = ckd_sub(&result, 1, 2);
  assert(!overflow);
  assert(result == -1);

  // オーバーフローする場合
  overflow = ckd_sub(&result, INT_MIN, 1);
  assert(overflow);
}
```
* ckd_sub[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]

## 参照
- [N2683 Towards Integer Safety](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2683.pdf)
- [P3370R1 Add new C headers as C++ headers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3370r1.html)
