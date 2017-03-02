#size
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type size() const;
```

##概要
`*this` が保持しているサブマッチの数を返す。


##戻り値
`*this` が成功したマッチの結果を保持している場合、マッチした正規表現のキャプチャグループ（括弧で囲まれた部分）の数に 1 を加えた数。  
そうでなければ 0。


##備考
- [`prefix`](prefix.md)、および、[`suffix`](suffix.md) で返されるオブジェクトも [`sub_match`](../sub_match.md) 型ではあるが、これらは本メンバ関数の戻り値の数には含まれていない。
- 本メンバ関数は [`ready`](ready.md)`() == false` でも呼び出すことが可能である（その場合、0 が返される）。
- 正規表現 `re` に含まれているキャプチャグループの数は `re.`[`mark_count`](../basic_regex/mark_count.md)`()` で取得することができる。  
    したがって、成功したマッチの結果を保持している場合には、`size() == 1 + re.`[`mark_count`](../basic_regex/mark_count.md)`()` となっている。  
    1 が加えられる理由は、正規表現全体にマッチした部分をサブマッチとして保持しているためである。  
    なお、失敗したマッチの結果を保持している場合には、使用した正規表現に含まれているキャプチャグループの数によらずに `size() == 0` である。


##例
```cpp
#include <iostream>
#include <regex>

int main()
{
  const char s1[] = " abc 012 def ";
  const char s2[] = " 012 abc 345 ";
  const std::regex re("(\\d+) (\\w+) (\\d+)");

  std::cout << std::boolalpha << "mark_count = " << re.mark_count() << std::endl;

  std::cmatch m;
  // regex_search 実行前
  std::cout << "ready = " << m.ready() << ", size = " << m.size() << std::endl;

  // regex_search 実行後（マッチ失敗）
  if (std::regex_search(s1, m, re)) {
    std::cout << "match:ready = " << m.ready() << ", size = " << m.size() << std::endl;
  } else {
    std::cout << "not match:ready = " << m.ready() << ", size = " << m.size() << std::endl;
  }

  // regex_search 実行後（マッチ成功）
  if (std::regex_search(s2, m, re)) {
    std::cout << "match:ready = " << m.ready() << ", size = " << m.size() << std::endl;
  } else {
    std::cout << "not match:ready = " << m.ready() << ", size = " << m.size() << std::endl;
  }
}
```
* size()[color ff0000]
* std::regex[link ../basic_regex.md]
* std::cmatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]
* m.ready()[link ready.md]
* re.mark_count()[link ../basic_regex/mark_count.md]

###出力
```
mark_count = 3
ready = false, size = 0
not match:ready = true, size = 0
match:ready = true, size = 4
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
