# back
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
reference back();             // (1)
const_reference back() const; // (2)
```

## 概要
末尾要素への参照を取得する


## 戻り値
末尾の要素への参照を返す。


## 備考
この関数の効果は、以下と�価になる：

```cpp
{
  auto tmp = end();
  --tmp;
  return *tmp;
}
```


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  int& x = v.back();
  std::cout << x << std::endl;
}
```
* back()[color ff0000]

### 出力
```
4
```

