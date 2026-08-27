# resize
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
void resize(size_type sz);           // (1) C++11
constexpr void resize(size_type sz); // (1) C++26

void resize(size_type sz, const value_type& c);           // (2) C++11
constexpr void resize(size_type sz, const value_type& c); // (2) C++26

void resize(size_type sz, T c = T());                     // (1) + (2) C++98。C++11で削除
```

## 概要
要素数を変更する。


## テンプレートパラメータ制約
- 型`T`がデフォルト構築可能であり、`*this`に対してコピー挿入可能であること


## 効果
`sz`がコンテナの要素数以下の場合、後ろから超過している要素を削除する。
`sz`がコンテナの要素数より大きい場合、不足している分だけ末尾に要素を挿入する。挿入する要素の値を指定しない場合(つまり1引数版を使用する場合)、値初期化された`T`型の値が挿入される。2引数版の場合は、値`c`のコピーが挿入される。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <list>
#include <algorithm>

int main()
{
  // 増加
  {
    std::list<int> ls = {3, 1, 4};
    ls.resize(5);

    std::for_each(ls.begin(), ls.end(), [](int x) { std::cout << x << std::endl; });
  }
  std::cout << std::endl;

  // 減少
  {
    std::list<int> ls = {3, 1, 4};
    ls.resize(1);

    std::for_each(ls.begin(), ls.end(), [](int x) { std::cout << x << std::endl; });
  }
}
```
* resize[color ff0000]
* ls.begin()[link begin.md]
* ls.end()[link end.md]

### 出力
```
3
1
4
0
0

3
```


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
- [LWG Issue 868. Default construction and value-initialization](https://cplusplus.github.io/LWG/issue868)
    - C++11の策定時に、値を指定しない`resize(sz)`の要素追加が「デフォルト構築」から「値初期化」へ改められた。ドラフト段階の文言では組み込み型の要素が未初期化になりうるものだったため（値を指定するC++98の`resize(sz, T())`とは挙動は変わらない）
- [LWG Issue 1420. Effects of `resize(size())` on a `list`](https://cplusplus.github.io/LWG/issue1420)
    - C++11で、効果の条件が`sz <= size()`へ修正された。C++11のドラフトでは`sz < size()`と`size() < sz`のみが規定されており、`sz == size()`の場合の効果が規定されていなかったため。この条件は現在の規格でも`sz <= size()`のままである（`sz == size()`の場合、削除される要素は`0`個となる）
