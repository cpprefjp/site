# end
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator end() noexcept;
const_iterator end() const noexcept;
```

## 概要
末尾の次を指すイテレータを取得する。


## 戻り値
末尾の次を指すイテレータ


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> ls = {1, 2, 3};
  const std::forward_list<int>& cls = ls;

  decltype(ls)::iterator i = ls.begin();
  decltype(ls)::iterator last = ls.end();

  decltype(ls)::const_iterator ci = cls.begin();
  decltype(ls)::const_iterator clast = cls.end();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* end()[color ff0000]
* begin()[link begin.md]

### 出力
```
1
2
3
1
2
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017


## 参照


