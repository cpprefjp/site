# operator!
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
valarray<bool> operator!() const;
```

## 概要
各要素の論理NOTをとる。


## 戻り値
以下のコードと等価のことを行う：

```cpp
valarray<bool> result(size());
for (std::size_t i = 0; i < size(); ++i) {
  result[i] = !(*this)[i];
}
return result;
```
* size()[link size.md]


## 備考
- `valarray<T>`型のオブジェクトを返すこの関数を含むあらゆる関数は、`valarray`クラスと同じ`const`メンバ関数をもつほかの型を返すことが実装に許可される。例として複数の`valarray`操作をつなげて記述したときに最適化できるよう、式テンプレートを返す実装もある


## 例
```cpp example
#include <cassert>
#include <valarray>

int main()
{
  const std::valarray<bool> va = {true, false, true};

  std::valarray<bool> result = !va;
  assert(!result[0]);
  assert(result[1]);
  assert(!result[2]);
}
```

### 出力
```
```


