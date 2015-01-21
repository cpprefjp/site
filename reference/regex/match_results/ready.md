#ready (C++11)
```cpp
bool ready() const;
```

##概要
マッチ結果が利用可能か否かを返す。


##戻り値
マッチ結果が利用可能である場合 `true`、利用可能ではない場合 `false`


##備考
- [`regex_match`](../regex_match.md.nolink)、および、[`regex_search`](../regex_search.md) の引数に渡した [`match_results`](../match_results.md) オブジェクトは、マッチが成功しなくても `ready() == true` となる。  
	[`match_results`](../match_results.md) オブジェクトでマッチが成功したか否かを確認する場合には、[`regex_match`](../regex_match.md.nolink)、および、[`regex_search`](../regex_search.md) の戻り値を使用するか、[`empty`](empty.md) を使用すると良い。
- [`regex_iterator`](../regex_iterator.md) を間接参照して得られる [`match_results`](../match_results.md) オブジェクトは、必ず `ready() == true` となる。
- `ready() != true` の場合、[`match_results`](../match_results.md) のほとんどのメンバ関数は使用できないため、注意が必要である（各メンバ関数の「要件」を参照）。


##例
```cpp
#include <iostream>
#include <regex>

int main()
{
  const char s1[] = " abc ";
  const char s2[] = " 012 ";
  const std::regex re("\\d+");

  std::cmatch m;
  // regex_search 実行前
  std::cout << std::boolalpha << "ready = " << m.ready() << ", empty = " << m.empty() << std::endl;

  // regex_search 実行後（マッチ失敗）
  if (std::regex_search(s1, m, re)) {
    std::cout << "match:ready = " << m.ready() << ", empty = " << m.empty() << std::endl;
  } else {
    std::cout << "not match:ready = " << m.ready() << ", empty = " << m.empty() << std::endl;
  }

  // regex_search 実行後（マッチ成功）
  if (std::regex_search(s2, m, re)) {
    std::cout << "match:ready = " << m.ready() << ", empty = " << m.empty() << std::endl;
  } else {
    std::cout << "not match:ready = " << m.ready() << ", empty = " << m.empty() << std::endl;
  }
}
```
* iostream[link ../../iostream.md]
* regex[link ../../regex.md]
* cmatch[link ../match_results.md]
* regex_search[link ../regex_search.md]
* ready[color ff0000]
* empty[link empty.md]
* boolalpha[link ../../ios/boolalpha.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]

###出力
```
ready = false, empty = true
not match:ready = true, empty = true
match:ready = true, empty = false
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
