#コンストラクタ
```cpp
locale() noexcept;
locale(const locale&) noexcept;
explicit locale(const char*);
explicit locale(const string&);
locale(cosnt locale&, const char*, category);
locale(cosnt locale&, const string&, category);
template<typename Facet>
locale(cosnt locale&, Facet*);
locale(const locale&, const locale&, category);
```

##localeオブジェクトの構築

- `locale() noexcept;`<br/>デフォルトコンストラクタ。呼び出した時点のグローバル`locale`のコピーを作成する。
- `locale(const locale&) noexcept;`<br/>コピーコンストラクタ。
- `explicit locale(const char* name);`<br/>名前からの構築。
- `explicit locale(const `[`string`](/reference/string/basic_string.md)`& name);`<br/>名前からの構築。
- `locale(cosnt locale& other, const char* name, category cats);`<br/>`cats`で指定された部分については`name`で指定される`locale`の、それ以外は`other`のファセットを組み合わせた`locale`を構築。
- `locale(cosnt locale& other, const string& name, category cats);`<br/>同上。
- `template<typename Facet>`<br/>`locale(cosnt locale& other, Facet* f);`<br/>`f`と`other`のファセット（`f`と同種のファセット以外）を組み合わせた`locale`の構築。
- `locale(const locale& other, const locale& one, category cats);`<br/>`cats`で指定された部分については`one`の、それ以外は`other`のファセットを組み合わせた`locale`を構築。


##例
```cpp
```

###出力
```
```

##参照
