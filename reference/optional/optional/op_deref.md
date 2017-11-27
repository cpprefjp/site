# operator*
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr const T& operator*() const&;   // (1)
constexpr T& operator*() &;              // (2)
constexpr T&& operator*() &&;            // (3)
constexpr const T&& operator*() const&&; // (4)
```

## 概要
有効値を取得する。

- (1) : `*this`が`const`左辺値である場合に、有効値への`const`左辺値参照を返す
- (2) : `*this`が非`const`左辺値である場合に、有効値への非`const`左辺値参照を返す
- (3) : `*this`が右辺値である場合に、有効値への右辺値参照を返す
- (4) : `*this`が`const`右辺値である場合に、有効値への`const`右辺値参照を返す


## 効果
- (1), (2) : 有効値を保持している場合、有効値への参照を返す
- (3), (4) : 有効値を保持している場合、有効値をムーブして返す


## 例外
- (1), (2) : 投げない


## 備考
`optional`クラスはスマートポインタとしても見なせるため、この演算子のようなポインタのインタフェースを持つ。非ポインタインタフェースである[`value()`](value.md)の使用も検討するとよい。


## 例
```cpp example
#include <iostream>
#include <optional>

int main()
{
  std::optional<int> p = 3;
  if (p) {
    int result = *p; // 保持している値を取得する
    std::cout << result << std::endl;
  }
}
```
* *p[color ff0000]

### 出力
```
3
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`optional::value()`](value.md)
