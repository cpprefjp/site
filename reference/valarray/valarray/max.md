# max
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
T max() const;
```

## 概要
最大の要素を取得する。


## 戻り値
`valarray`オブジェクトに含まれる最大の要素を返す。

最大要素の計算には、要素型`T`の`operator<`を使用する。計算の順番は未規定。

要素数が`0`の場合、未定義動作を引き起こす。要素数が`1`の場合、`0`番目の要素を返す。


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<int> va = {3, 1, 4};

  int result = va.max();
  std::cout << result << std::endl;
}
```
* max()[color ff0000]

### 出力
```
4
```
