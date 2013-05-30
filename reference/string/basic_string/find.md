#find
```cpp
size_type find(const basic_string &str, size_type pos = 0) const noexcept; // (1)
size_type find(const charT *s, size_type pos, size_type n) const;          // (2)
size_type find(const charT *s, size_type pos = 0) const noexcept;          // (3)
size_type find(charT c, size_type pos = 0) const noexcept;                 // (4)
```

##概要
指定した文字列を検索する。


##効果
- (1) `pos`以降で最初に`str`と一致する位置を返す。
- (2) `pos`以降で最初に`s`と一致する位置を返す。`s`は長さ`n`の文字列へのポインタである。
- (3) (2)と同様だが、こちらはNULL終端の文字列を扱う。
- (4) `pos`以降で最初に`c`と一致する位置を返す。


##戻り値
見つかればその位置を返し、見つからない場合は`string::npos`を返す。


##例外
投げない


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  const std::string s("hello, world. welcome to C++ world.");
  const std::string find_word("world");
  std::string::size_type pos = s.find(find_word);
  while (pos != std::string::npos) {
    std::cout << pos << std::endl;
    pos = s.find(find_word, pos + find_word.length());
  }
}
```

###出力
```cpp
7
29
```

##参照


