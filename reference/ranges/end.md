# end
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ end = /*unspecified*/;
  }
}
```

## 概要
Rangeから最後尾要素の次を指すイテレータもしくは番兵を取得する関数オブジェクト。

## 効果
部分式`E`の型を`T`、`t`を`E`を評価した値とする。
このとき、式`ranges::begin(E)`の効果は以下の通り。

1. `E`がrvalueかつ[`enable_borrowed_range`](enable_borrowed_range.md)`<`[`remove_cv_t`](/reference/type_traits/remove_cv.md)`<T>>`が`false`であれば、呼び出しは不適格。
2. `T`が配列型であれば、`t +` [`extent_v`](/reference/type_traits/extent.md)`<T>`に等しい(expression‑equivalent)。ただし、要素数不明の配列か、[`remove_all_extents_t`](/reference/type_traits/remove_all_extents.md)`<T>`が不完全型であれば、呼び出しは不適格(診断不要)。
3. [`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.end())`が有効な式でその型が[`sentinel_for`](/reference/iterator/sentinel_for.md)`<`[`iterator_t`](iterator_t.md)`<T>>`のモデルであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.end())`と等しい。
4. `T`がクラス型または列挙体であって、`end(t)`の`end`の意味がADLのみによって決まるコンテキストで、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(end(t))`が有効な式でその型が[`sentinel_for`](/reference/iterator/sentinel_for.md)`<`[`iterator_t`](iterator_t.md)`<T>>`のモデルであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(end(t))`と等しい。

どれにも当てはまらないとき、呼び出しは不適格。

## 戻り値
最後尾要素の次を指すイテレータもしくは番兵。

## カスタマイゼーションポイント
3か4の条件を満たすようにする。例えば、ユーザー定義のフリー関数`end`を定義するか、ユーザー定義のクラスにメンバ関数`end`を持たせることでカスタマイズできる。

## 備考
`ranges::end(E)`が有効な式であるとき、`ranges::end(E)`の型`S`、[`ranges::begin`](begin.md)`(E)`の型`I`は[`sentinel_for`](/reference/iterator/sentinel_for.md)`<S, I>`のモデルである。

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
* std::ranges::begin[link begin.md]
* std::ranges::end[color ff0000]

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
- [`std::end`](/reference/iterator/end.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2602R2 Poison Pills are Too Toxic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2602r2.html)
