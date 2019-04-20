# abs
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  valarray<T> abs(const valarray<T>& va);
}
```

## 概要
絶対値（大きさ・マグニチュード）を得る。abs は absolute value（絶対値）の略。


## 戻り値
以下のコードと等価のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::abs));
```
* apply[link apply.md]
* std::abs[link /reference/cmath/abs.md]


## 備考
- `valarray<T>`型のオブジェクトを返すこの関数を含むあらゆる関数は、`valarray`クラスと同じ`const`メンバ関数をもつほかの型を返すことが実装に許可される。例として複数の`valarray`操作をつなげて記述したときに最適化できるよう、式テンプレートを返す実装もある


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> va = {1.0f, -2.0f, 3.0f, -4.0f};

  std::valarray<float> result = std::abs(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::abs[color ff0000]

### 出力
```
1
2
3
4
```


