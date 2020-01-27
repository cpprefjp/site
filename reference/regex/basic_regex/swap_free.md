# swap (非メンバ関数)
* regex[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class charT, class traits>
void swap(basic_regex<charT, traits>& lhs, basic_regex<charT, traits>& rhs);
```
* basic_regex[link ../basic_regex.md]

## 概要
2 つの�規表現オブジェクトを交換する。


## 効果
`lhs.`[`swap`](swap.md)`(rhs)`


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <regex>

void print(const std::regex& re)
{
  const char s[] = " abc 123 def ";
  std::cmatch m;
  std::regex_search(s, m, re);
  std::cout << "ready:" << std::boolalpha << m.ready() << std::endl;
  if (m.ready()) {
    std::cout << "prefix:'" << m.prefix() << '\'' << std::endl;
    for (std::size_t i = 0, n = m.size(); i < n; ++i) {
      std::cout << i << ":'" << m.str(i) << "', position = " << m.position(i) << std::endl;
    }
    std::cout << "suffix:'" << m.suffix() << '\'' << std::endl;
  }
  std::cout << std::endl;
}

int main()
{
  std::regex re1("\\w+");
  std::regex re2("\\d+");

  // swap 前
  print(re1);
  print(re2);

  std::swap(re1, re2);

  // swap 後
  print(re1);
  print(re2);
}
```
* std::swap[color ff0000]
* std::cmatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]
* m.prefix()[link ../match_results/prefix.md]
* m.suffix()[link ../match_results/suffix.md]
* m.str[link ../match_results/str.md]
* m.position[link ../match_results/position.md]
* m.size()[link ../match_results/size.md]
* m.ready()[link ../match_results/ready.md]

### 出力
```
ready:true
prefix:' '
0:'abc', position = 1
suffix:' 123 def '

ready:true
prefix:' abc '
0:'123', position = 5
suffix:' def '

ready:true
prefix:' abc '
0:'123', position = 5
suffix:' def '

ready:true
prefix:' '
0:'abc', position = 1
suffix:' 123 def '
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
