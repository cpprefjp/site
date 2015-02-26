#sqrt
* valarray[meta header]

```cpp
namespace std {
  template <class T>
  valarray<T> sqrt(const valarray<T>& v);
}
```

##概要
平方根（square root）を得る。


##戻り値
以下のコードと同等のことを行う：

```cpp
return v.apply(static_cast<T(*)(T)>(std::sqrt));
```
* apply[link ./apply.md]
* sqrt[link /reference/cmath/sqrt.md]


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> v = {1.0f, 2.0f, 3.0f};

  std::valarray<float> result = std::sqrt(v);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* sqrt[color ff0000]

###出力
```
1
1.41421
1.73205
```


