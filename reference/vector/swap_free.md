#swap (非メンバ関数)
* vector[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  void swap(vector<T, Allocator>& x, vector<T, Allocator>& y);
}
```

##概要
2つの`vector`オブジェクトを入れ替える


##効果
`x.`[`swap`](swap.md)`(y)`


##戻り値
なし


##例
```cpp
#include <iostream>
#include <vector>

template <class T>
void print(const char* name, const std::vector<T>& v)
{
  std::cout << name << " : {";

  for (const T& x : v) {
    std::cout << x << " ";
  }

  std::cout << "}" << std::endl;
}

int main()
{
  std::vector<int> v1 = {1, 2, 3};
  std::vector<int> v2 = {4, 5, 6};

  std::swap(v1, v2);

  print("v1", v1);
  print("v2", v2);
}
```
* swap[color ff0000]

###出力
```
v1 : {4 5 6 }
v2 : {1 2 3 }
```

##参照


