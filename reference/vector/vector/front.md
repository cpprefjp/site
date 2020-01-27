# front
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
reference front();             // (1)
const_reference front() const; // (2)
```

## 概要
先�要素への参照を取得する。


## 戻り値
先�要素への参照


## 計算量
定数時間


## 備考
式 `*begin()` と�価の効果となる。


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  int& x = v.front();
  std::cout << x << std::endl;
}
```
* front()[color ff0000]

### 出力
```
3
```

