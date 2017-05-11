# empty
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
bool empty() const noexcept;
```

## 概要
コンテナが空かどうかを判定する


## 戻り値
コンテナが空であれば`true`、そうでなければ`false`を返す。


## 計算量
定数時間


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
  // 空
  {
    std::vector<int> v;
    bool b = v.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
  // 空じゃない
  {
    std::vector<int> v = {1, 2, 3};
    bool b = v.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
}
```
* empty()[color ff0000]

### 出力
```
true
false
```

## 備考
`a.empty()` と `a.begin() == a.end()` は同じ結果になる。


