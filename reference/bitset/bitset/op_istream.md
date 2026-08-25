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
1. 入力ストリーム`is`から`N`文字を読み、[`basic_string`](/reference/string/basic_string.md)型の一時オブジェクトを作って読み込んだ文字列を保持する。文字は、以下のいずれかの条件を満たすまで読む：
	- `N`文字読み込んで保持した
	- 入力シーケンスが終端に達した
	- 次に読み込む文字が`is.widen('0')`と`is.widen('1')`のどちらでもなかった。
2. 読み込んだ文字列`str`を`bitset`のコンストラクタに渡して構築し、`x`に代入する：`x = bitset<N>(str);`

1文字も入力が行われなかった場合の[`ios_base`](/reference/ios/ios_base.md)`::failbit`の設定は、バージョンによって以下のように異なる：

- C++98 : 1文字も入力が行われなかった場合、`failbit`を設定する
- C++20 : `N > 0`かつ1文字も入力が行われなかった場合に、`failbit`を設定する（`bitset<0>`に対する入力が常に失敗してしまう問題への対処）
- C++23 : `N > 0`かつ1文字も入力が行われなかった場合に、ローカルエラー状態へ`failbit`を設定する

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
- [LWG Issue 3199. `istream >> bitset<0>` fails](https://cplusplus.github.io/LWG/issue3199)
    - C++20で、`failbit`を設定する条件に`N > 0`が追加された。これにより`bitset<0>`に対する入力が常に失敗してしまう問題が修正された
- [P1264R2 Revising the wording of stream input operations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1264r2.pdf)
    - C++23でローカルエラー状態の概念が導入され、入力関数のエラー処理セマンティクスが明確化された
