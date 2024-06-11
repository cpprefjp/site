# rbegin
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ rbegin = /*unspecified*/;
  }
}
```

## 概要
Rangeの末尾を指す逆イテレータを取得する関数オブジェクト。

## 効果

部分式`E`の型を`T`、`t`を`E`を評価した値とする。
このとき、式`ranges::rbegin(E)`の効果は以下の通り。

1. `E`がrvalueかつ[`enable_borrowed_range`](enable_borrowed_range.md)`<`[`remove_cv_t`](/reference/type_traits/remove_cv.md)`<T>>`が`false`であれば、呼び出しは不適格。
2. `T`が配列型かつ[`remove_all_extents_t`](/reference/type_traits/remove_all_extents.md)`<T>`が不完全型であれば、呼び出しは不適格(診断不要)。
3. [`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.rbegin())`が有効な式でその型が[`input_or_output_iterator`](/reference/iterator/input_or_output_iterator.md)のモデルであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.rbegin())`と等しい。
4. `T`がクラス型または列挙体であって、`rbegin`がADLで見つかり、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(rbegin(t))`が有効な式でその型が[`input_or_output_iterator`](/reference/iterator/input_or_output_iterator.md)のモデルであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(rbegin(t))`と等しい。
5. [`ranges::begin`](begin.md)`(t)`と[`ranges::end`](end.md)`(t)`が同じ型をもつ有効な式で、その型が[`bidirectional_iterator`](/reference/iterator/bidirectional_iterator.md)のモデルであれば、[`make_reverse_iterator`](/reference/iterator/make_reverse_iterator.md)`(`[`ranges::end`](end.md)`(t))`と等しい。

どれにも当てはまらないとき、呼び出しは不適格。

## 戻り値
Rangeの末尾を指す逆イテレータ。

## カスタマイゼーションポイント
3か4の条件を満たすようにする。例えば、ユーザー定義のフリー関数`rbegin`を定義するか、ユーザー定義のクラスにメンバ関数`rbegin`を持たせることでカスタマイズできる。
または、5の条件を満たすようにして、[`ranges::begin`](begin.md)、[`ranges::end`](end.md)をカスタマイズすることで、`ranges::rbegin`をカスタマイズできる。

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
* std::ranges::rbegin[color ff0000]
* std::ranges::rend[link rend.md]
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
- [`std::rbegin`](/reference/iterator/rbegin.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
