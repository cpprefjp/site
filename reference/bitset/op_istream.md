#operator>>
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]

```cpp
namespace std {
  template <class CharT, class Traits, size_t N>
  basic_istream<CharT, Traits>&
    operator>>(basic_istream<CharT, Traits>& is, bitset<N>& x);
}
```
* basic_istream[link /reference/istream/basic_istream.md]

##概要
2進数表記でストリームから入力する。


##効果
1. 入力ストリーム`is`から`N`文字を読み、[`basic_string`](/reference/string/basic_string.md)型の一時オブジェクトを作って読み込んだ文字列を保持する。文字は、以下のいずれかの条件を満たすまで読む：
	- `N`文字読み込んで保持した
	- 入力シーケンスが終端に達した
	- 次に読み込む文字が`is.widen('0')`と`is.widen('1')`のどちらでもなかった。
2. 読み込んだ文字列`str`を`bitset`のコンストラクタに渡して構築し、`x`に代入する：`x = bitset<N>(str);`

`str`に1文字も入力が行われなかった場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base`](/reference/ios/ios_base.md)`::failbit)`が呼び出される。

##戻り値
`is`


##例
```cpp
#include <iostream>
#include <sstream>
#include <bitset>

int main()
{
  std::stringstream ss;
  ss << "1010";

  std::bitset<4> bs;
  ss >> bs;

  std::cout << bs << std::endl;
}
```

###出力
```
1010
```


##参照

