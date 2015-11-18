#swap (非メンバ関数)
* deque[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  void swap(deque<T,Allocator>& x, deque<T,Allocator>& y);
}
```

##概要
2つの`deque`オブジェクトを入れ替える


##効果
`x.`[`swap`](swap.md)`(y)`


##戻り値
なし


##例
```cpp
#include <iostream>
#include <deque>

template <class T>
void print(const char* name, const std::deque<T>& c)
{
  std::cout << name << " : {";

  for (const T& x : c) {
    std::cout << x << " ";
  }

  std::cout << "}" << std::endl;
}

int main()
{
  std::deque<int> c1 = {1, 2, 3};
  std::deque<int> c2 = {4, 5, 6};

  std::swap(c1, c2);

  print("c1", c1);
  print("c2", c2);
}
```
* swap[color ff0000]

###出力
```
c1 : {4 5 6 }
c2 : {1 2 3 }
```

##参照


