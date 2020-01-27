# boolalpha
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& boolalpha(ios_base& str);
}
```

## 概要
bool値を文�列として入出力することを指示するマニピュレータ。

## 効果
`str.setf(std::ios_base::boolalpha)`を実行する。

## 戻り値
実引数のstrオブジェクト。

## 例
```cpp example
#include <iostream>

int main()
{
  std::cout << std::boolalpha << true << std::endl;
}
```
* std::boolalpha[color ff0000]

### 出力
```
true
```

## バージョン
### 言語
- C++03

## 参照
- [`noboolalpha`](noboolalpha.md)
