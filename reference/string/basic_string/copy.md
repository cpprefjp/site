#copy
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
size_type copy(charT* s, size_type n, size_type pos = 0) const;
```

##概要
他の文字列に、自身の文字列をコピーする。


##要件
`pos <=` [`size()`](size.md)


##効果
`n`と[`size()`](size.md) `- pos`のうち、小さい方をコピーする長さとして、自身の文字列をパラメータ`s`にコピーする。  
`pos`はコピーを開始する、自身の文字列の開始位置。  

この関数は、文字列`s`にヌルオブジェクトを追加しない。


##戻り値
コピーした長さを返す。


##例外
`pos >` [`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  const std::string s = "hello";

  // 全体をコピーする
  {
    char result[5 + 1] = {};
    s.copy(result, 5);

    std::cout << result << std::endl;
  }

  // 先頭3要素だけコピーする
  {
    char result[3 + 1] = {};
    s.copy(result, 3);

    std::cout << result << std::endl;
  }

  // 2番目以降の要素をコピーする
  {
    char result[3 + 1] = {};
    s.copy(result, 3, 2);

    std::cout << result << std::endl;
  }
}
```

###出力
```
hello
hel
llo
```

##参照

