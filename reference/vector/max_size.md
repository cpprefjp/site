# max_size
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
size_type max_size() const noexcept;
```

## 概要
コンテナに格納可能な最大数を取得する。


## 戻り値
コンテナに格納可能な最大数


## 例外
投げない


## 計算量
定数時間


## 例
```cpp
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v;
  std::size_t s = v.max_size();

  std::cout << s << std::endl;
}
```
* max_size[color ff0000]

### 出力例
```
4611686018427387903
```


