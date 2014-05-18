#resize (C++11)
```cpp
void resize(size_type sz);
void resize(size_type sz, const value_type& c);
```

##概要
要素数を変更する


##要件
型`T`がデフォルトコンストラクト可能であり、`*this`に対して[`CopyInsertable`](/reference/container_concepts/copyinsertable.md)であること


##効果
`sz`がコンテナの要素数より小さい場合、後ろから超過している要素を削除する。
`sz`がコンテナの要素数より大きい場合、不足している分だけ末尾に要素を挿入する。挿入する要素の値を指定しない場合(つまり1引数版を使用する場合)、値初期化された`T`型の値が挿入される。2引数版の場合は、値`c`のコピーが挿入される。


##戻り値
なし


##例
```cpp
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


###出力
```
3
1
4
0
0

3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??

##参照


