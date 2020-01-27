# begin
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr iterator begin() const noexcept;        // (1)

friend constexpr iterator begin(span s) noexcept; // (2)
```

## 概要
先�要素を指すイテレータを取得する。

- (1) : メンバ関数として、先�要素を指すイテレータを取得する
- (2) : ADLで探索される関数として、先�要素を指すイテレータを取得する


## 戻り値
- (1) : `span`オブジェクトが参照している範囲の、最初の要素を参照するイテレータを返す。[`empty()`](empty.md)が`true`である場合、[`end()`](end.md)と同じ値が返る
- (2) : `return s.begin();`


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <span>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // vの先�3要素を部分シーケンスとして参照する
  std::span<int, 3> s = std::span(v).first(3);

  // (1)
  std::for_each(s.begin(), s.end(), [](int x) {
    std::cout << x << ',';
  });
  std::cout << std::endl;

  // (2) 名前空間修飾なしで、ADLで呼び出す
  std::for_each(begin(s), end(s), [](int x) {
    std::cout << x << ',';
  });
  std::cout << std::endl;

  // (1)に対する、<iterator>で定義される汎用的なstd::begin()/std::end()の呼び出し
  std::for_each(std::begin(s), std::end(s), [](int x) {
    std::cout << x << ',';
  });
  std::cout << std::endl;

  // (2) 範囲for文は、ADLでbegin()/end()を探索する
  for (int x : s) {
    std::cout << x << ',';
  }
  std::cout << std::endl;
}
```
* s.begin[color ff0000]
* begin(s)[color ff0000]
* s.end()[link end.md]
* end(s)[link end.md]
* std::begin[link /reference/iterator/begin.md]
* std::end[link /reference/iterator/end.md]
* first[link first.md]

### 出力
```
1,2,3,
1,2,3,
1,2,3,
1,2,3,
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0896R4 The One Ranges proposal](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P1601R0 Recommendations for Specifying "Hidden Friends"](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1601r0.pdf)
- [Hidden Friends - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20190531/p1)
- [The Power of Hidden Friends in C++ - Just Software Solutions](https://www.justsoftwaresolutions.co.uk/cplusplus/hidden-friends.html)
