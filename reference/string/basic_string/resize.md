# resize
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
void resize(size_type n, charT c);
void resize(size_type n);
```

## 概要
文�列の長さを変更する。


## 要件
`n <=` [`max_size()`](max_size.md)


## 効果
`n <=` [`size()`](size.md) のとき、元の文�列の先� `n` 文�をコピーした文�列で置き換える。  
`n >` [`size()`](size.md) のとき、先� `n` 文�は元の文�列のコピー、残りは文� `c` を並べた文�列で置き換える。  
`resize(n)` は、 `resize(n, charT())` と�しい。


## 戻り値
なし


## 例外
`n >` [`max_size()`](max_size.md) の時、[`length_error`](/reference/stdexcept.md) 例外を投げる。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";

  // sの長さを10に変更。大きくなった場所には'x'を埋める。
  s.resize(10, 'x');

  std::cout << s << std::endl;
}
```
* resize[color ff0000]

### 出力
```
helloxxxxx
```

## 参照
