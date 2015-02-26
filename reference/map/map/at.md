#at (C++11)
* map[meta header]
* std[meta namespace]
* map[meta class]

```cpp
T& at(const key_type& x);
const T& at(const key_type & x) const;
```

##概要
指定したキーを持つ要素を取得する。  
要素を取り出す際にキーの存在チェックをする。


##戻り値
キー`x`に対応する値を返す。対応する要素が存在しないときは、[`out_of_range`](/reference/stdexcept.md)例外を投げる。


##計算量
要素数に対して対数時間


##例
```cpp
#include <iostream>
#include <map>
#include <stdexcept>

template<class Container, class T>
void at_wrap(Container &c, T v)
{
  try {
    std::cout << c.at(v) << std::endl;
  }
  catch(std::out_of_range&) {
    std::cout << "exception std::out_of_ranget" << std::endl;
  }
}

int main()
{
  std::map<int,char> s1;
  s1.insert(std::make_pair(1,'a'));

  at_wrap(s1, 1);
  at_wrap(s1, 2);

  return 0;
}
```

###出力
```
a
exception std::out_of_ranget
```

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

##参照

| 名前 | 説明 |
|------------------------------------------------|-----------------------|
| [`operator=`](/reference/map/map/op_assign.md) | 代入演算子 |
| [`insert`](/reference/map/map/insert.md) | 要素を挿入する |


