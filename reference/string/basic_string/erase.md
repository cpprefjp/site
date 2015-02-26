#erase
* string[meta header]
* std[meta namespace]

```cpp
basic_string& erase(size_type pos = 0, size_type n = npos); // (1)

iterator erase(iterator p);       // (2) C++03まで
iterator erase(const_iterator p); // (2) C++11から

iterator erase(iterator first, iterator last);             // (3) C++03まで
iterator erase(const_iterator first, const_iterator last); // (3) C++11から
```

##概要
要素を削除する。


- (1) : `pos`番目から`n`要素を削除する。
- (2) : イテレータ`p`が指す要素を削除する
- (3) : イテレータ範囲`[first, last)`を削除する


##要件
- (1) : `pos <=` [`size()`](./size.md)
- (3) : `first`と`last`が`*this`に対する有効なイテレータであり、`[first, last)`が有効な範囲であること。


##効果
- (1) : `n`と[`size()`](./size.md) `- pos`のうち小さい方を`xlen`とし、`pos`番目から`xlen`個の要素を削除する。
- (2) : イテレータ`p`が指す要素を削除する。
- (3) : 範囲`[first, last)`の文字列を削除する。


##戻り値
- (1) : `*this`
- (2) : 削除した要素の次を指すイテレータを返す。そのような要素がなければ[`end()`](./end.md)を返す。
- (3) : 最後に削除した要素の次を指すイテレータを返す。そのような要素がなければ[`end()`](./end.md)を返す。


##例外
- (1) : `pos >` [`size()`](./size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  // (1) 指定した位置からN個の要素を削除する
  {
    std::string s = "12345";

    // 1番目から2個の要素を削除
    s.erase(1, 2);

    std::cout << "(1) : " << s << std::endl;
  }

  // (2) 指定したイテレータが指す要素を削除する
  {
    std::string s = "12345";
   
    decltype(s)::iterator it = s.begin() + 2; // '3'を指す
    s.erase(it);
   
    std::cout << "(2) : " << s << std::endl;
  }

  // (3) 指定したイテレータ範囲を削除する
  {
    std::string s = "12345";

    decltype(s)::iterator it = s.begin() + 2; // '3'を指す
    s.erase(it, s.end());

    std::cout << "(3) : " << s << std::endl;
  }
}
```

###出力
```
(1) : 145
(2) : 1245
(3) : 12
```

##参照
- [LWG Issue 180. Container member iterator arguments constness has unintended consequences](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#180)
