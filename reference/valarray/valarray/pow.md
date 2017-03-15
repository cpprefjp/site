# pow
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class T>
  valarray<T> pow(const valarray<T>& xs, const valarray<T>& ys);

  template <class T>
  valarray<T> pow(const valarray<T>& xs, const T& y);

  template <class T>
  valarray<T> pow(const T& x, const valarray<T>& ys);
}
```

## 概要
累乗を得る。pow は power（累乗、指数）の略。


## 戻り値
- (1) : 以下のコードと同等のことを行う：

```cpp
std::valarray<T> result(xs.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = std::pow(xs[i], ys[i]);
}
return result;
```
* pow[link /reference/cmath/pow.md]


- (2) : 以下のコードと同等のことを行う：

```cpp
std::valarray<T> result(xs.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = std::pow(xs[i], y);
}
return result;
```
* pow[link /reference/cmath/pow.md]


- (3) : 以下のコードと同等のことを行う：

```cpp
std::valarray<T> result(ys.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = std::pow(x, ys[i]);
}
return result;
```
* pow[link /reference/cmath/pow.md]


## 備考
2つの`valarray`オブジェクトの要素数が異なる場合、その挙動は未定義。


## 例
```cpp
#include <iostream>
#include <valarray>

template <class T>
void print(const char* name, const std::valarray<T>& va)
{
  std::cout << name << " : {";
  bool first = true;

  for (const T& x : va) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  const std::valarray<float> xs = {2.0f, 3.0f, 4.0f};
  const std::valarray<float> ys = {3.0f, 4.0f, 5.0f};

  std::valarray<float> result1 = std::pow(xs, ys);
  print("valarray-valarray", result1);

  std::valarray<float> result2 = std::pow(xs, 3.0f);
  print("valarray-float", result2);

  std::valarray<float> result3 = std::pow(3.0f, ys);
  print("float-valarray", result3);
}
```
* pow[color ff0000]

### 出力
```
valarray-valarray : {8,81,1024}
valarray-float : {8,27,64}
float-valarray : {27,81,243}
```


