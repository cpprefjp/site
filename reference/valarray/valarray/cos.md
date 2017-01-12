#cos
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class T>
  valarray<T> cos(const valarray<T>& va);
}
```

##概要
余弦（コサイン：cosine）を得る。


##戻り値
以下のコードと同等のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::cos));
```
* apply[link apply.md]
* cos[link /reference/cmath/cos.md]


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> va = {0.1f, 0.2f, 0.3f};

  std::valarray<float> result = std::cos(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* cos[color ff0000]

###出力
```
0.995004
0.980067
0.955337
```


