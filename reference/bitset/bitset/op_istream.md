# operator>>
* bitset[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits, size_t N>
  std::basic_istream<CharT, Traits>&
    operator>>(std::basic_istream<CharT, Traits>& is, bitset<N>& x);
}
```

## 概要
2進数表記でストリームから入力する。


## 効果
1. 入力ストリーム`is`から`N`文�を�み、[`basic_string`](/reference/string/basic_string.md)型の一時オブジェクトを作って�み込んだ文�列を保持する。文�は、以下のいずれかの条件を満たすまで�む：
	- `N`文��み込んで保持した
	- 入力シーケンスが終端に達した
	- 次に�み込む文�が`is.widen('0')`と`is.widen('1')`のどちらでもなかった。
2. �み込んだ文�列`str`を`bitset`のコンストラクタに渡して構築し、`x`に代入する：`x = bitset<N>(str);`

`str`に1文�も入力が行われなかった場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base`](/reference/ios/ios_base.md)`::failbit)`が呼び出される。

## 戻り値
`is`


## 例
```cpp example
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

### 出力
```
1010
```


## 参照

