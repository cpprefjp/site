# take_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<view V>
  class take_view : public view_interface<take_view<V>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ take = /*unspecified*/;     // (2)
  }
}
```
* view[link view.md]
* view_interface[link view_interface.md]

## 概要
- (1): 元のRangeの先頭から指定した個数の値を取り出す[`view`](view.md)
- (2): `take_view`、または(1)の動作を実現する[`view`](view.md)を生成するRangeアダプタオブジェクト

`take`で得られる[`view`](view.md)の大きさは、指定した個数に関わらず、元のRangeの大きさを超えることは無い。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| (1)      | (1)   | (1)    | (1)   | (1)     | (1)           | (1)           | (1)        | (1)    | ○       | ○   |

- (1): `V`に従う

## テンプレートパラメータ制約

- [`view`](view.md)`<V>`

## 効果

- (2): `E`および`F`を式、型`T`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`decltype`](/lang/cpp11/decltype.md)`((E))>`、型`D`を[`range_difference_t`](range_difference_t.md)`<`[`decltype`](/lang/cpp11/decltype.md)`((E))>`とする。式`views::take(E, F)`の効果は以下の通り
    - [`decltype`](/lang/cpp11/decltype.md)`((F))`が[`convertible_to`](/reference/concepts/convertible_to.md)`<D>`のモデルでなければ、呼び出しは不適格
    - `T`が[`ranges::empty_view`](empty_view.md)の特殊化であれば、`((void) F, `[`decay-copy`](/reference/exposition-only/decay-copy.md)`(E))`と等しい。ただし、`E`と`F`の評価順序は不定順で序列化(indeterminately sequenced)される
    - `T`が[`random_access_range`](random_access_range.md)および[`sized_range`](sized_range.md)のモデルであり、かつ次のいずれかの特殊化であるとき、`T(`[`ranges::begin`](begin.md)`(E), `[`ranges::begin`](begin.md)`(E) + `[`min`](/reference/algorithm/min.md)`<D>(`[`ranges::size`](size.md)`(E), F))`と等しい。ただし、`E`は1度だけ評価される
        - [`span`](/reference/span/span.md) (ただし、`T::extent == `[`dynamic_extent`](/reference/span/dynamic_extent.md)であること)
        - [`basic_string_view`](/reference/string_view/basic_string_view.md)
        - [`ranges::iota_view`](iota_view.md)
        - [`ranges::subrange`](subrange.md)
    - それ以外のとき、`ranges::take_view(E, F)`

`take_view`でラップする必要が無い型では`take_view`を使わないようになっている。

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](take_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`base`](take_view/base.md.nolink)                     | `V`の参照を取得する              | C++20          |
| [`begin`](take_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](take_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |
| [`size`](take_view/size.md.nolink)                     | 要素数を取得する                 | C++20          |

`r`を元のRangeとする。`size`は[`ranges::size`](size.md)`(r)`が有効な式であるときに定義される。

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`data`](view_interface/data.md)             | Rangeの先頭へのポインタを取得する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する             | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する      | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](take_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 使用上の注意

この`view`（及びRangeアダプタ）は、入力が[`random_access_range`](random_access_range.md)ではない場合に意図しない無限ループに陥ることがある

```cpp
int main() {
  for (auto i  : std::views::iota(0)
               | std::views::filter([](auto i) { return i < 10; })
               | std::views::take(10))
  {
    std::cout << i << '\n';
  }
}
```

このコードは0から9までの数字を出力するだけのループに見えるが、実行すると無限ループに陥るか完了までに多大な時間を要する。

範囲`for`文は内部でイテレータを用いた通常`for`文に展開されており、1つのループの終わりでは次の様な順番でループのための処理が行われている

1. イテレータのインクリメント
2. イテレータの終端チェック
3. ループ本体実行

この例における1では、次の様なことが起きている

1. `take_view`イテレータのインクリメント
    1. `take_view`内部カウンタの減算
    2. [`filter_view`](filter_view.md)のイテレータのインクリメント
        1. 条件を満たす次の要素の探索
            - 条件を満たす要素が見つかるまで、`iota_view`イテレータをインクリメントする
                1. `iota_view`イテレータのインクリメント
                    - 増分1で整数値を生成、この場合は終端がない
                2. `iota_view`生成値の読み取りと条件チェック

`views::iota(0)`によるシーケンスは0始まりの整数の無限列であり、`filter_view`のフィルタ条件（`return i < 10`）は10未満の整数値のみを取り出すものである。したがってこの場合、`iota_view`が10を生成して以降は`filter_view`で条件を満たす要素は存在しなくなる。

ループの最終端、本体処理が9を出力した後のループ終了直前には、`take_view`の内部カウンタが0になり`take_view`の終了条件が満たされるものの、その直後に内部イテレータ（`filter_view`のイテレータ）をインクリメントしてしまう。`filter_view`のイテレータはインクリメントによって10未満の次の要素を探索するために`iota_view`のイテレータをインクリメントし、`iota_view`は10以降の整数値をひたすら生成し続ける。

この例の`iota_view`の要素型は符号付き整数型であるため、そのオーバーフローは未定義動作となり、このループが終了するかどうかは保証されない。

入力に対して`filter_view`の条件の与え方が悪いという見方もできるが、これは`take_view`イテレータのインクリメント時に起こることに問題があり、`take_view`のイテレータは入力が[`random_access_range`](random_access_range.md)ではない場合は[`counted_iterator`](/reference/iterator/counted_iterator.md)を使用するため、本質的には`counted_iterator`の問題である。

`counted_iterator`はインクリメント時にカウンタ値を減算してからラップしているイテレータをインクリメントするが、カウンタ値を考慮せず常にインクリメントを行うため`counted_iterator`の内部カウンタが0になりその終了条件が満たされた時でもラップするイテレータをインクリメントしてしまう。そのため、`filter_view`イテレータのようにそのイテレータ取得時点で終端が確定していないイテレータを入力として使用すると、その終端でこのような問題が起こりうる。

特に、`input_iterator`では、イテレータがその範囲の終端に達した後でインクリメントしてしまうと何が起こるかわからないため、この問題はより複雑な形で顕在化する可能性がある。

```cpp
int main() {
  // 入力ストリームには整数値1つしかない
  auto iss = std::istringstream("0");

  // 0を読んだ後、takeイテレータが進行するが、istream_viewが次のストリーム入力を待機するために終了しない
  for (auto i : std::ranges::istream_view<int>(iss)
              | std::views::take(1))
  {
    std::cout << i << '\n';
  }
}
```

この例では、`istream_view`の基底のストリームに追加の要素が入力されるか、ストリームが閉じられるまで`istream_view`のイテレータはインクリメント時に次の要素の入力を待機し続けてしまう。より一般的な`input_iterator`ではどうなるかわからない。

ただし、`take_view`は入力範囲が`random_access_range`の場合は`counted_iterator`を使用しないため、`random_access_range`に対して使用する場合はこの問題は起こらない。

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  using namespace std;

  for (int i : views::iota(1) | views::take(5)) {
    cout << i;
  }
}
```
* views::take[color ff0000]
* views::iota[link iota_view.md]

### 出力
```
12345
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2367R0 Remove misuses of list-initialization from Clause 24](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2367r0.html) (本提案文書はC++20に遡って適用されている)
- [P2406R2 Add `lazy_counted_iterator`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2406r2.html)
- [P2017R1 Conditionally borrowed ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2017r1.html)