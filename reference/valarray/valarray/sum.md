# sum
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
T sum() const;
```

## 概要
合計値を求める。


## 戻り値
`valarray`オブジェクトに含まれる要素の合計値を返す。

合計値の計算には、要素型`T`の`operator+=`を使用する。計算の順番は未規定。

要素数が`0`の場合、未定義動作を引き起こす。要素数が`1`の場合、`0`番目の要素を返す。


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<int> va = {1, 2, 3, 4, 5};

  int result = va.sum();
  std::cout << result << std::endl;
}
```
* sum()[color ff0000]

### 出力
```
15
```


