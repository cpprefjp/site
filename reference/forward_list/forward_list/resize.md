# resize
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void resize(size_type sz);           // (1) C++11
constexpr void resize(size_type sz); // (1) C++26

void resize(size_type sz, const value_type& c);           // (2) C++11
constexpr void resize(size_type sz, const value_type& c); // (2) C++26
```

## 概要
要素数を変更する


## テンプレートパラメータ制約
- (1) 
    - C++14まで : 型`T`がデフォルト構築可能であること
    - C++17から : 型`T`が`*this`に対してデフォルト挿入可能であること
- (2) : 型`T`が`*this`に対してコピー挿入可能であること


## 効果
`sz`がコンテナの要素数より小さい場合、後ろから超過している要素を削除する。

`sz`がコンテナの要素数より大きい場合、不足している分だけ末尾に要素を挿入する。挿入する要素の値を指定しない場合(つまり1引数版を使用する場合)、値初期化された`T`型の値が挿入される。2引数版の場合は、値`c`のコピーが挿入される。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <forward_list>
#include <algorithm>

int main()
{
  // 増加
  {
    std::forward_list<int> ls = {3, 1, 4};
    ls.resize(5);

    std::for_each(ls.begin(), ls.end(), [](int x) { std::cout << x << std::endl; });
  }
  std::cout << std::endl;

  // 減少
  {
    std::forward_list<int> ls = {3, 1, 4};
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

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
- [LWG Issue 868. Default construction and value-initialization](https://cplusplus.github.io/LWG/issue868)
    - C++11の策定時に、値を指定しない`resize(sz)`の要素追加が「デフォルト構築」から「値初期化」へ改められた。ドラフト段階の文言では組み込み型の要素が未初期化になりうるものだったため（値を指定するC++98の`resize(sz, T())`とは挙動は変わらない）
- [LWG Issue 1340. Why does `forward_list::resize` take the object to be copied by value?](https://cplusplus.github.io/LWG/issue1340)
    - C++11で、値を指定するオーバーロードの引数型が`value_type`から`const value_type&`へ改められた。ほかのコンテナと扱いを揃え、不要なコピーを避けるため
