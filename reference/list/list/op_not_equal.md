# operator!=
* list[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator!=(const list<T, Allocator>& x, const list<T, Allocator>& y);
}
```

## 概要
`list`オブジェクトの非�値比較を行う。


## 要件
型`T`が`operator==`で比較可能であること。


## 戻り値
`!(x == y)`


## 計算量
線形時間。ただし、`x`と`y`のサイズが異なる場合は定数時間。


## 例
```cpp example
#include <iostream>
#include <list>

int main ()
{
  std::list<int> ls1 = {1, 2, 3};
  std::list<int> ls2 = {1, 2, 3};
  std::list<int> ls3 = {1, 2, 3, 4};

  std::cout << std::boolalpha;

  // 要素数と要素の値が�しい
  std::cout << (ls1 != ls2) << std::endl;

  // 要素の値は(左辺の要素数分まで)�しいが要素数が異なる
  std::cout << (ls1 != ls3) << std::endl;

}
```

### 出力
```
false
true
```


