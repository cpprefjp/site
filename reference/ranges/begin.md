# begin
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ begin = /*unspecified*/;
  }
}
```

## 概要
Rangeから先頭要素へのイテレータを取得する関数オブジェクト。

## 効果
部分式`E`の型を`T`、`t`を`E`を評価した値とする。
このとき、式`ranges::begin(E)`の効果は以下の通り。

1. `E`がrvalueかつ[`enable_borrowed_range`](enable_borrowed_range.md)`<`[`remove_cv_t`](/reference/type_traits/remove_cv.md)`<T>>`が`false`であれば、呼び出しは不適格。
2. `T`が配列型であれば、`t + 0`に等しい(expression‑equivalent)。ただし、[`remove_all_extents_t`](/reference/type_traits/remove_all_extents.md)`<T>`が不完全型であれば、呼び出しは不適格(診断不要)。
3. [`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.begin())`が有効な式でその型が[`input_or_output_iterator`](/reference/iterator/input_or_output_iterator.md)のモデルであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.begin())`と等しい。
4. `T`がクラス型または列挙体であって、`begin(t)`の`begin`の意味がADLのみによって決まるコンテキストで、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(begin(t))`が有効な式でその型が[`input_or_output_iterator`](/reference/iterator/input_or_output_iterator.md)のモデルであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(begin(t))`と等しい。

どれにも当てはまらないとき、呼び出しは不適格。

## 戻り値
Rangeの先頭要素へのイテレータ。

## カスタマイゼーションポイント
3か4の条件を満たすようにする。例えば、ユーザー定義のフリー関数`begin`を定義するか、ユーザー定義のクラスにメンバ関数`begin`を持たせることでカスタマイズできる。

## 備考
`ranges::begin`の呼び出しが有効な式であるとき、その型は[`input_or_output_iterator`](/reference/iterator/input_or_output_iterator.md)のモデルである。

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

    decltype(v)::iterator first = std::ranges::begin(v);
    decltype(v)::iterator last = std::ranges::end(v);

    std::for_each(first, last, print);
  }
  std::cout << std::endl;

  // 組み込み配列
  {
    int ar[] = {4, 5, 6};

    int* first = std::ranges::begin(ar);
    int* last = std::ranges::end(ar);

    std::for_each(first, last, print);
  }
}
```
* std::ranges::begin[color ff0000]
* std::ranges::end[link end.md]

### 出力
```
1 2 3 
4 5 6 
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
- [`std::begin`](/reference/iterator/begin.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2602R2 Poison Pills are Too Toxic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2602r2.html)
