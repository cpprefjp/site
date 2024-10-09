# operator*
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr T& operator*() &;                 // (1)
constexpr T&& operator*() &&;               // (2)
constexpr const T& operator*() const&;      // (3)
constexpr const T&& operator*() const&&;    // (4)
```

## 概要
有効値を取得する。

- (1) : `*this` が非 `const` 左辺値である場合に、有効値への非 `const` 左辺値参照を返す
- (2) : `*this` が非 `const` 右辺値である場合に、有効値への非 `const` 右辺値参照を返す
- (3) : `*this` が `const` 左辺値である場合に、有効値への `const` 左辺値参照を返す
- (4) : `*this` が `const` 右辺値である場合に、有効値への `const` 右辺値参照を返す


## 要件
[`has_value()`](has_value.md) `== true` であること。


## 戻り値
- (1) : 有効値への非 `const` 左辺値参照
- (2) : 有効値への非 `const` 右辺値参照
- (3) : 有効値への `const` 左辺値参照
- (4) : 有効値への `const` 右辺値参照


## 例外
- 投げない


## 備考
`optional` クラスはスマートポインタとしても見なせるため、この演算子のようなポインタのインタフェースを持つ。  
非ポインタインタフェースである [`value()`](value.md) の方がより明示的な（視覚的に目立つ）アクセス方法ではあるが、本演算子は [`value()`](value.md) とは異なり [`has_value()`](has_value.md) `!= true` の場合に使用すると未定義動作を引き起こす。（[`value()`](value.md) は [`bad_optional_access`](/reference/optional/bad_optional_access.md) 例外を送出する）  
逆に言えば、ライブラリ実装は本演算子の実装時に [`has_value()`](has_value.md) ` == true` であることのチェックを行う必要が無いため、あらかじめ [`has_value()`](has_value.md) `== true` であることが分かっている場合には、おそらく [`value()`](value.md) よりも本演算子の方が速度的には有利だろう。（ただし、規格でチェックを禁止されているわけではない）


## 例
```cpp example
#include <iostream>
#include <optional>

int main()
{
  std::optional<int> p = 3;
  if (p) {
    // 保持している値を取得する
    std::cout << *p << '\n';

    // 参照なので変更も可能
    *p = 42;
    std::cout << *p << '\n';
  }
}
```
* *p[color ff0000]

### 出力
```
3
42
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`optional::value()`](value.md)
