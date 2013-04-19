#find
```cpp
size_type find(const basic_string &str, size_type pos = 0) const noexcept;    // (1)
size_type find(const charT *s, size_type pos, size_type n) const;    <span>    <span>    <span> // (2)</span></span></span>
size_type find(const charT *s, size_type pos = 0) const noexcept;        <span>    <span> // (3)</span></span>
size_type find(charT c, size_type pos = 0) const noexcept;        <span>    <span> <span>    <span>   </span>// (4)</span></span></span>
```

##概要

<b>指定した文字列を検索する。</b>


##効果

(1) pos以降で最初にstrと一致する位置を返す。

(2) pos以降で最初にsと一致する位置を返す。sは長さnの文字列へのポインタである。
(3) (2)と同様だが、こちらはNULL終端の文字列を扱う。
(4) pos以降で最初にcと一致する位置を返す。


##戻り値

見つかればその位置を返し、見つからない場合はstring::nposを返す。


##例外


##備考



##例

```cpp
const string s("hello, world. welcome to C++ world.");
const string find_word("world");
string::size_type pos = s.find(find_word);
while (pos != string::npos) {
    cout << pos << endl;
    pos = s.find(find_word, pos + find_word.length());
}
```

###出力

```cpp
7
29
```

##バージョン


###言語


- C++



##参照


