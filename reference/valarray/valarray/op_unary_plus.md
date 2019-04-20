# operator+ (単項)
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
valarray<T> operator+() const;
```

## 概要
単項 `+` 演算（符号そのままの要素を得る）。


## 戻り値
以下のコードと等価のことを行う：

```cpp
valarray<T> result(size());
for (std::size_t i = 0; i < size(); ++i) {
  result[i] = +(*this)[i];
}
return result;
```
* size()[link size.md]


## 備考
- `valarray<T>`型のオブジェクトを返すこの関数を含むあらゆる関数は、`valarray`クラスと同じ`const`メンバ関数をもつほかの型を返すことが実装に許可される。例として複数の`valarray`操作をつなげて記述したときに最適化できるよう、式テンプレートを返す実装もある


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> a = {1, -2, 3};

  std::valarray<int> result = +a;
  for (int x : result) {
    std::cout << x << std::endl;
  }
}
```
* +a[color ff0000]

### 出力
```
1
-2
3
```


