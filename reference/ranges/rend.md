# rend
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ rend = /*unspecified*/;
  }
}
```

## 概要
Rangeの先頭の前を指す逆イテレータもしくは番兵を取得する関数オブジェクト。

## 効果
部分式`E`の型を`T`、`t`を`E`を評価した値とする。
このとき、式`ranges::begin(E)`の効果は以下の通り。

1. `E`がrvalueかつ[`enable_borrowed_range`](enable_borrowed_range.md)`<`[`remove_cv_t`](/reference/type_traits/remove_cv.md)`<T>>`が`false`であれば、呼び出しは不適格。
2. `T`が配列型かつ[`remove_all_extents_t`](/reference/type_traits/remove_all_extents.md)`<T>`が不完全型であれば、呼び出しは不適格(診断不要)。
3. [`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.rend())`が有効な式でその型が[`sentinel_for`](/reference/iterator/sentinel_for.md)`<decltype(`[`ranges::rbegin`](rbegin.md)`(E))>`のモデルであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.rend())`と等しい。
4. `T`がクラス型または列挙体であって、`rend(t)`の`rend`の意味がADLのみによって決まるコンテキストで、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(rend(t))`が有効な式でその型が[`sentinel_for`](/reference/iterator/sentinel_for.md)`<decltype(`[`ranges::rbegin`](rbegin.md)`(E))>`のモデルであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(rend(t))`と等しい。
5. [`ranges::begin`](begin.md)`(t)`と[`ranges::end`](end.md)`(t)`が同じ型をもつ有効な式で、その型が[`bidirectional_iterator`](/reference/iterator/bidirectional_iterator.md)のモデルであれば、[`make_reverse_iterator`](/reference/iterator/make_reverse_iterator.md)`(`[`ranges::begin`](begin.md)`(t))`と等しい。

どれにも当てはまらないとき、呼び出しは不適格。

## 戻り値
Rangeの先頭の前を指す逆イテレータもしくは番兵。

## カスタマイゼーションポイント
3か4の条件を満たすようにする。例えば、ユーザー定義のフリー関数`rend`を定義するか、ユーザー定義のクラスにメンバ関数`rend`を持たせることでカスタマイズできる。
または、5の条件を満たすようにして、[`ranges::begin`](begin.md)、[`ranges::end`](end.md)をカスタマイズすることで、`ranges::rend`をカスタマイズできる。

## 備考
`ranges::rend(E)`が有効な式であるとき、`ranges::rend(E)`の型`S`、[`ranges::rbegin`](rbegin.md)`(E)`の型`I`は[`sentinel_for`](/reference/iterator/sentinel_for.md)`<S, I>`のモデルである。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>

void print(int x)
{
  std::cout << x << " ";
}

int main()
{
  // コンテナ
  {
    std::vector<int> v = {1, 2, 3};

    decltype(v)::reverse_iterator first = std::ranges::rbegin(v);
    decltype(v)::reverse_iterator last = std::ranges::rend(v);

    std::for_each(first, last, print);
  }
  std::cout << std::endl;

  // 組み込み配列
  {
    int ar[] = {4, 5, 6};

    std::reverse_iterator<int*> first = std::ranges::rbegin(ar);
    std::reverse_iterator<int*> last = std::ranges::rend(ar);

    std::for_each(first, last, print);
  }
  std::cout << std::endl;

  // 初期化子リスト
  {
    std::initializer_list<int> init = {7, 8, 9};

    std::reverse_iterator<const int*> first = std::ranges::rbegin(init);
    std::reverse_iterator<const int*> last = std::ranges::rend(init);

    std::for_each(first, last, print);
  }
}
```
* std::ranges::rend[color ff0000]
* std::ranges::rbegin[link rbegin.md]
* std::reverse_iterator[link /reference/iterator/reverse_iterator.md]

### 出力
```
3 2 1 
6 5 4 
9 8 7 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 関連項目
- [`std::rend`](/reference/iterator/rend.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2602R2 Poison Pills are Too Toxic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2602r2.html)
