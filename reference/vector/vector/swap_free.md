# swap (非メンバ関数)
* vector[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  void swap(vector<T, Allocator>& x, vector<T, Allocator>& y); // (1) C++03

  template <class T, class Allocator>
  void swap(vector<T,Allocator>& x, vector<T,Allocator>& y)
    noexcept(noexcept(x.swap(y)));                             // (1) C++17

  template <class T, class Allocator>
  constexpr void swap(vector<T,Allocator>& x, vector<T,Allocator>& y)
    noexcept(noexcept(x.swap(y)));                             // (1) C++20
}
```

## 概要
2つの`vector`オブジェクトを入れ替える


## 効果
`x.`[`swap`](swap.md)`(y)`


## 戻り値
なし


## 例
```cpp example
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
* std::swap[color ff0000]

### 出力
```
v1 : {4 5 6 }
v2 : {1 2 3 }
```

## 参照
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
