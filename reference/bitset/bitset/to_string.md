# to_string
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function template[meta id-type]

```cpp
template <class CharT, class Traits, class Allocator>
basic_string<CharT, Traits, Allocator> to_string() const;           // (1) C++03

template <class CharT = char,
          class Traits = char_traits<CharT>,
          class Allocator = allocator<CharT>>
basic_string<CharT, Traits, Allocator>
  to_string(CharT zero = CharT('0'), CharT one = CharT('1')) const; // (1) C++11

template <class CharT = char,
          class Traits = char_traits<CharT>,
          class Allocator = allocator<CharT>>
constexpr basic_string<CharT, Traits, Allocator>
  to_string(CharT zero = CharT('0'), CharT one = CharT('1')) const; // (1) C++23
```
* basic_string[link /reference/string/basic_string.md]

## 概要
文字列に変換する。


## 戻り値
1. `bitset`クラスのテンプレートパラメータ`N`の長さの`basic_string`オブジェクトを構築する。
2. 各ビットを文字表現に変換する
	- C++03 : ビット値0は文字`CharT(0)`に、ビット値1は文字`CharT(1)`に変換。
	- C++11 : ビット値0はパラメータ`zero`の文字に、ビット値1はパラメータ`one`に変換。
3. 各ビットの文字表現を、構築した`basic_string`オブジェクトに順番に設定して返す。


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<8> bs(131uL);

  // C++03版の使用法
  std::string s1 = bs.to_string<char, std::char_traits<char>, std::allocator<char>>();
  std::cout << s1 << std::endl;

  // C++11版の使用法
  std::string s2 = bs.to_string();
  std::cout << s2 << std::endl;
}
```

### 出力
```
10000011
10000011
```


## 備考
- Visual C++、GCC(libstdc++)には、C++03でも`bs.to_string()`のように簡単に使用するための独自実装が追加で導入されていた。


## 参照
- [LWG Issue 853. `to_string` needs updating with `zero` and `one`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#853)
    - C++11で、`0`を表す文字と`1`を表す文字を指定できるようになった経緯のレポート
- [LWG Issue 1113. `bitset::to_string` could be simplified](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#1113)
    - C++11で、デフォルトの文字型が設定された経緯のレポート
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
