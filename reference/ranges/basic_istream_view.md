# basic_istream_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<movable Val, class CharT, class Traits>
    requires default_initializable<Val> && stream-extractable<Val, CharT, Traits>
  class basic_istream_view : public view_interface<basic_istream_view<Val, CharT, Traits>> { …… }; // (1)

  namespace views {
    template<class Val, class CharT, class Traits>
    basic_istream_view<Val, CharT, Traits> istream_view(basic_istream<CharT, Traits>& s);  // (2)
  }
}
```
* movable[link /reference/concepts/movable.md]
* default_initializable[link /reference/concepts/default_initializable.md]
* view_interface[link view_interface.md]
* stream-extractable[italic]

## 概要
- (1): 入力ストリームから値を読み取る[`view`](view.md)
- (2): `basic_istream_view`を生成する関数テンプレート

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          |       |        | ○    |         |               |               |            |        | ○       | ○   |

## テンプレートパラメータ制約

説明専用コンセプト`stream-extractable`を以下のように定義する。

```cpp
template<class Val, class CharT, class Traits>
concept stream-extractable = requires(basic_istream<CharT, Traits>& is, Val& t) { is >> t; }
```

これを用いて、

- [`movable`](/reference/concepts/movable.md)`<Val>`
- [`default_initializable`](/reference/concepts/default_initializable.md)`<Val>`
- `stream-extractable<Val, CharT, Traits>`

## 効果

- (2): `return basic_istream_view<Val, CharT, Traits>{s};`

## メンバ関数

| 名前                                                     | 説明                             | 対応バージョン |
|----------------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](basic_istream_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`begin`](basic_istream_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](basic_istream_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |

## 例
```cpp example
#include <ranges>
#include <sstream>
#include <iostream>

int main() {
  using namespace std;
  auto iss = istringstream{"1 2 3 4 5"};

  for (int i : views::istream_view<int>(iss)) {
    cout << i;
  }
}
```
* views::istream_view[color ff0000]

### 出力
```
12345
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
