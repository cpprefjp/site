#substr
```cpp
basic_string substr(size_type pos = 0, size_type n = npos) const;
```

##概要
部分文字列を取得する。  
`pos`番目から`n`要素の文字列を返す。


##要件
`pos <=` [`size()`](./size.md)


##戻り値
`n`と[`size()`](./size.md) `- pos`のうち、小さい方をコピーする長さ`rlen`として、

`basic_string(`[`data()`](./data.md)`+pos, rlen)`

を返す。パラメータ`n`のデフォルト引数である`npos`の場合には、`pos`番目以降の全体を返す。


##例外
`pos >` [`size()`](./size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  const std::string s = "hello";

  // 2番目から3要素だけ抜き出した部分文字列を取得する
  {
    std::string result = s.substr(2, 3);
    std::cout << result << std::endl;
  }

  // 2番目以降の全体からなる部分文字列を取得する
  {
    std::string result = s.substr(2);
    std::cout << result << std::endl;
  }
}
```

###出力
```
llo
llo
```

##参照

