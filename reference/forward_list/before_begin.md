#before_begin (C++11)
```cpp
iterator before_begin() noexcept;
const_iterator before_begin() const noexcept;
```

##概要
先頭要素の前を指すイテレータを取得する。
この関数は、`insert_after()`メンバ関数で先頭に要素を挿入するために使用できる。


##戻り値
先頭要素の前を指すイテレータを返す。


##例外
投げない


##備考
この関数によって返されるイテレータは、以下の特徴を持つ：
- 間接参照できない
- インクリメントすると[`begin()`](./begin.md)と等値になる
- [`end()`](./end.md)と等値にはならない


##例
```cpp
#include <iostream>
#include <forward_list>
#include <algorithm>

int main()
{
  std::forward_list<int> ls;

  ls.push_front(3);
  ls.insert_after(ls.before_begin(), 1); // 先頭に挿入

  std::for_each(ls.cbegin(), ls.cend(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* before_begin[color ff0000]

###出力
```
1
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


