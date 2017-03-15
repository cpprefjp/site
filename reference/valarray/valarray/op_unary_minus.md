# operator- (単項)
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
valarray<T> operator-() const;
```

## 概要
単項 `+` 演算（符号を反転した要素を得る）。


## 戻り値
以下のコードと同等のことを行う：

```cpp
valarray<T> result(size());
for (size_t i = 0; i < size(); ++i) {
  result[i] = -(*this)[i];
}
return result;
```


## 例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> a = {1, -2, 3};

  std::valarray<int> result = -a;
  for (int x : result) {
    std::cout << x << std::endl;
  }
}
```
* -a[color ff0000]

### 出力
```
-1
2
-3
```


