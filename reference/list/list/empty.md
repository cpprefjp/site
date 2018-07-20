# empty
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
bool empty() const;          // C++03
bool empty() const noexcept; // C++11
```

## 概要
コンテナが空かどうかを判定する


## 戻り値
コンテナが空であれば`true`、そうでなければ`false`を返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  // 空
  {
    std::list<int> ls;
    bool b = ls.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
  // 空じゃない
  {
    std::list<int> ls = {1, 2, 3};
    bool b = ls.empty();
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

## 参照


