#sin
```cpp
namespace std {
  template <class T>
  valarray<T> sin(const valarray<T>& v);
}
```

##概要
正弦（サイン：sine）を得る。


##戻り値
以下のコードと同等のことを行う：

```cpp
return v.apply(static_cast<T(*)(T)>(std::sin));
```
* apply[link ./apply.md]
* sin[link /reference/cmath/sin.md]


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> v = {0.1f, 0.2f, 0.3f};

  std::valarray<float> result = std::sin(v);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* sin[color ff0000]

###出力
```
0.0998334
0.198669
0.29552
```


